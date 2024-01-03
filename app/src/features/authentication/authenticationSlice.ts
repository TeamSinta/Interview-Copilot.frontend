import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './authenticationInterface';
import { authAPI } from './authenticationAPI';

const initialState: AuthState = {
  status: 'IDLE',
  isAuthenticated: false,
  user: {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    profile_picture: null,
    id: null,
    companies: [],
  },
  token: {
    access: null,
    refresh: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<'IDLE' | 'LOADING' | 'AUTHENTICATED' | 'FAILED'>
    ) => {
      state.status = action.payload;
    },
    resetUserState: () => initialState,
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setTokens: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authAPI.endpoints.googleLogin.matchPending, (state) => {
        state.status = 'LOADING';
      })
      .addMatcher(
        authAPI.endpoints.googleLogin.matchFulfilled,
        (state, action) => {
          state.isAuthenticated = true;
          state.status = 'AUTHENTICATED';
          state.token.access = action.payload.access;
          state.token.refresh = action.payload.refresh;
        }
      )
      .addMatcher(authAPI.endpoints.googleLogin.matchRejected, (state) => {
        state.status = 'FAILED';
      })
      .addMatcher(authAPI.endpoints.getUser.matchPending, (state) => {
        state.status = 'LOADING';
      })
      .addMatcher(authAPI.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
        state.user.profile_picture = action.payload.profile_picture;
        state.user.id = action.payload.pk;
        state.user.companies = action.payload.companies;
        state.status = 'AUTHENTICATED';
      })
      .addMatcher(authAPI.endpoints.getUser.matchRejected, (state) => {
        state.status = 'FAILED';
      });
  },
});

export const checkUserAuthentication = createAsyncThunk(
  'user/checkUserAuthentication',
  async (_, { dispatch }) => {
    try {
      // Call the appropriate API endpoint to check authentication status
      const result = await authAPI.endpoints.validateToken;

      if (result.error) {
        dispatch(setIsAuthenticated(false));
      } else {
        // Authentication check succeeded
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      // Handle errors here, e.g., dispatch a "FAILED" action
      dispatch(setStatus('FAILED'));
      console.error('Error checking authentication:', error);
    }
  }
);

export const { setStatus, resetUserState, setIsAuthenticated, setTokens } =
  userSlice.actions;
export default userSlice.reducer;
