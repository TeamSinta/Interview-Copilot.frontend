import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import {
	setIsAuthenticated,
	resetUserState,
	checkUserAuthentication,
	setStatus
} from '@/features/authentication/authenticationSlice';
import { RootState, AppDispatch } from '@/app/store';
import {
	useGetAccessTokenMutation,
	useGetUserMutation,
	useValidateTokenMutation
} from '@/features/authentication/authenticationAPI';
import { setCurrentWorkspace } from '@/features/workspace/userWorkspaceSlice';
import Loading from '@/components/common/elements/loading/Loading';

interface AuthGuardProps {
	children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const navigate = useNavigate();
	const { user, status, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);
	const workspace = useSelector((state: RootState) => state.workspace);
	const dispatch: AppDispatch = useDispatch();

	const [cookies, setCookies, removeCookies] = useCookies([
		'refresh_token',
		'access_token'
	]);
	const accessToken: string | undefined = cookies.access_token;
	const refreshToken: string | undefined = cookies.refresh_token;

	const [validateToken] = useValidateTokenMutation();
	const [getUser] = useGetUserMutation();
	const [getAccessToken] = useGetAccessTokenMutation();
	const [isInitialCheck, setIsInitialCheck] = useState(true);

	const authenticateUser = async (accessToken: string) => {
		try {
			const result = await validateToken({ access: accessToken });
			if ('data' in result) {
				await getUser({ access: accessToken });
				dispatch(setIsAuthenticated(true));
			} else {
				await handleTokenRefresh();
			}
		} catch (error: unknown) {
			failedAuthentication();
		}
	};

	const handleTokenRefresh = async () => {
		if (refreshToken) {
			const newAccessToken = await getAccessToken({ refresh: refreshToken });
			if ('data' in newAccessToken && newAccessToken.data?.access) {
				const { access } = newAccessToken.data;
				setCookies('access_token', access);
				dispatch(setIsAuthenticated(true));
				await getUser({ access: access });
			} else {
				failedAuthentication();
			}
		} else {
			failedAuthentication();
		}
	};

	const setDefaultWorkspace = () => {
		if (user.companies && user.companies.length > 0 && !workspace.id) {
			const defaultCompany = user.companies[0];
			dispatch(setCurrentWorkspace(defaultCompany));
		}
	};

	// 1. Initial render sets status to checking
	useEffect(() => {
		dispatch(setStatus('CHECKING'));
	}, [dispatch]);

	const checkAuthentication = async () => {
		console.log('checkAuthentication triggered');
		try {
			// Dispatch the checkUserAuthentication action to check if the user is authenticated
			await dispatch(checkUserAuthentication());

			// Check the user's authentication status
			if (!isAuthenticated && accessToken) {
				await authenticateUser(accessToken);
			} else if (!isAuthenticated) {
				await handleTokenRefresh();
			}

			// Check if user email is missing and fetch it if needed
			if (!user.email) {
				console.log('No user email, trying to fetch user...');
				await getUser({ access: accessToken });
			}
			// Set the default workspace if needed
			setDefaultWorkspace();
		} catch (error: unknown) {
			if (error instanceof Error) {
				failedAuthentication();
			} else {
				failedAuthentication();
			}
		} finally {
			setIsInitialCheck(false);
		}
	};

	useEffect(() => {
		const initAuth = async () => {
			switch (status) {
				case 'IDLE':
				case 'CHECKING':
					checkAuthentication();
					break;

				case 'AUTHENTICATED':
					console.log('User is authenticated.');
					break;

				case 'FAILED':
					console.log('Authentication failed. Logging out.');
					failedAuthentication();
					break;
			}
		};

		initAuth();
	}, [isAuthenticated, status]);

	const failedAuthentication = () => {
		dispatch(resetUserState());
		removeCookies('access_token');
		removeCookies('refresh_token');
		navigate('/login');
	};

	if (status === 'CHECKING' || status === 'LOADING') {
		return <Loading />;
	}
	return <>{children}</>;
};

// I think the logic works. Check the logs to make sure it doesn't like overly init the useEffect. I dont want it to reload unecessarily.
// The page initializes with isAuthenticated false + IDLE, so it still renders without the navbars first, which is annoying and looks ugly AF.. I want it to either show loading
// or nothing.
