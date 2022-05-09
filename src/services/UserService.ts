import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// types
import {IUser} from "../types";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], number>({
            query: (limit: number = 5) => ({
                url: '/users',
                params: {
                    _limit: limit,
                }
            })
        })
    }),
});