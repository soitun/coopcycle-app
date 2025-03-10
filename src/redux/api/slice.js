import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { fetchAllRecordsBis } from '../util';

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // The "endpoints" represent operations and requests for this server
  // nodeId is passed in JSON-LD '@id' key, https://www.w3.org/TR/2014/REC-json-ld-20140116/#node-identifiers
  endpoints: builder => ({
    subscriptionGenerateOrders: builder.mutation({
      query: date => ({
        url: 'api/recurrence_rules/generate_orders',
        params: {
          date: date.format('YYYY-MM-DD'),
        },
        method: 'POST',
        body: {},
      }),
    }),
    getUnassignedTasks: builder.query({
      async queryFn(date, _queryApi, _extraOptions, fetchWithBQ) {
        const result = await fetchAllRecordsBis(
          fetchWithBQ,
          'api/tasks',
          100,
          {
            date: date.format('YYYY-MM-DD'),
            assigned: 'no'
          });

        return result ? { data: result } : { error: "result.error" };
      }
    }),
    getMyTasks: builder.query({
      query: date => `api/me/tasks/${date.format('YYYY-MM-DD')}`,
    }),
    getOrderTiming: builder.query({
      query: nodeId => `${nodeId}/timing`,
    }),
    getOrderValidate: builder.query({
      query: nodeId => `${nodeId}/validate`,
    }),
    updateOrder: builder.mutation({
      query: ({ nodeId, ...patch }) => ({
        url: nodeId,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

// Export the auto-generated hook for the query endpoints
export const {
  useSubscriptionGenerateOrdersMutation,
  useGetUnassignedTasksQuery,
  useGetMyTasksQuery,
  useGetOrderTimingQuery,
  useUpdateOrderMutation,
} = apiSlice;
