import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './authenticationInterface';
import { authAPI } from './authenticationAPI';

const initialState: AuthState = {
	loading: false,
	userInfo: {
		username: null,
		first_name: null,
		last_name: null,
		email: null,
		profile_picture: null,
		id: null,
		companies: []
	},
	userToken: null,
	error: null,
	success: false
};

export const checkUserAuthentication = createAsyncThunk(
	'user/checkUserAuthentication',
	async (_, { dispatch }) => {
		try {
			// Call the appropriate API endpoint to check authentication status
			const result = await authAPI.endpoints.validateToken;

			if (result.error) {
				dispatch(setIsAuthenticated(false));
				dispatch(setStatus('FAILED'));
			} else {
				// Authentication check succeeded
				dispatch(setIsAuthenticated(true));
				dispatch(setStatus('AUTHENTICATED'));
			}
		} catch (error) {
			// Handle errors here, e.g., dispatch a "FAILED" action
			dispatch(setStatus('FAILED'));
			console.error('Error checking authentication:', error);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(authAPI.endpoints.googleLogin.matchPending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(authAPI.endpoints.googleLogin.matchFulfilled, (state) => {
				state.loading = false;
				state.success = true; // login successfull
			})
			.addMatcher(
				authAPI.endpoints.googleLogin.matchRejected,
				(state, { payload }) => {
					state.loading = false;
					state.error = payload;
				}
			);
	}
});

export default authSlice.reducer;
