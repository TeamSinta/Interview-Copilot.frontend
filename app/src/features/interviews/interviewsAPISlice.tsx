import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const InterviewRoundsAPI = createApi({
  reducerPath: 'InterviewRoundsAPI', // Unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, // Assuming you have the base URL in your env
    prepareHeaders: (headers, { getState }) => {
      // Setting up headers, e.g., Authorization header
      const token = (getState() as any)?.user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['InterviewRounds'], // Define tag types for caching and invalidation
  endpoints: (builder) => ({
    // Adding your existing endpoints here

    // Define the mutation for updating an interview round
    updateInterviewRound: builder.mutation({
      query: (data) => ({
        url: `/interview-rounds/${data.id}/update/`,
        method: 'PUT', // Use PUT or PATCH as needed
        body: data,
      }),
      invalidatesTags: ['InterviewRounds'], // Invalidate cache tags to refresh data after mutation
    }),

    // Add other endpoints as needed
  }),
});

// Export hooks for your mutation
export const {
  // Export other generated hooks as needed
  useUpdateInterviewRoundMutation,
} = InterviewRoundsAPI;
