import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// types
import {
    IUserFetchResponse,
    IUserRegistrationError,
    IUserRegistrationRequest,
    IUserRegistrationResponse,
    IUsersPositionsResponse
} from "../../../types";
import {baseUrl} from "./AuthService";
import {RootState} from "../store";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).globalSlice.token;

            if (token) {
                headers.set('Token', token);
            }

            return headers;
        },
    }) as unknown as BaseQueryFn<string | FetchArgs, unknown, IUserRegistrationError, {}>,
    tagTypes: ['Users', 'Positions'],
    endpoints: (build) => ({
        fetchUsers: build.query<IUserFetchResponse, { page: number; count: number; }>({
            query: ({page = 1, count = 6}) => ({
                url: '/users',
                params: {
                    page: page,
                    count: count,
                }
            }),
            providesTags: results => ['Users'],
        }),
        fetchUsersPositions: build.query<IUsersPositionsResponse, void>({
            query: () => ({
                url: '/positions',
            }),
            providesTags: result => ['Positions'],
        }),
        registrationNewUser: build.mutation<IUserRegistrationResponse | IUserRegistrationError, FormData | IUserRegistrationRequest>({
                query: (user) => ({
                    url: '/users',
                    method: "POST",
                    body: user,
                }),
                invalidatesTags: ['Users'],
            }
        ),
    }),
});

export const {
    useFetchUsersQuery,
    useFetchUsersPositionsQuery,
    useRegistrationNewUserMutation
} = userAPI;