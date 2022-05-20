import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// const
import {baseUrl} from "./UserService";
// types
import {IAuthToken} from "../types";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (build) => ({
        getAuthToken: build.query<IAuthToken, void>({
            query: () => ({
                url: '/token',
            }),
        }),
    }),
});