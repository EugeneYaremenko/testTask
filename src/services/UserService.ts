import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// types
import {IUser} from "../types";

export const baseUrl: string = 'https://frontend-test-assignment-api.abz.agency/api/v1';


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (build) => ({
        fetchUsers: build.query<IUser[], { page: number; count: number; }>({
            query: ({page = 1, count = 6}) => ({
                url: '/users',
                params: {
                    page: page,
                    count: count,
                }
            }),
        })
    }),
});