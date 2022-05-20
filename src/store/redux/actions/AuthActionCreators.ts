import axios from "axios";
import {baseUrl} from "../../../services/UserService";
// redux
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthToken} from "../../../types";
// types

// ** Method returns a token that is required to register a new user.
// The token is valid for 40 minutes and can be used for only one request.
// For the next registration, you will need to get a new one. **//
export const authToken = createAsyncThunk(
    'auth/getAuthToken',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<IAuthToken>(baseUrl);

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);