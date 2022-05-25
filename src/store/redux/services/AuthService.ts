import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// types
import {IAuthTokenResponse} from "../../../types";


export const baseUrl: string = 'https://frontend-test-assignment-api.abz.agency/api/v1';


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (build) => ({
        getAuthToken: build.query<IAuthTokenResponse, void>({
            query: () => ({
                url: '/token',
            }),
        }),
    }),
});



