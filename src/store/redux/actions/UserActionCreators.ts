import axios from "axios";
import {baseUrl} from "../../../services/UserService";
// redux
import {createAsyncThunk} from "@reduxjs/toolkit";
// types
import {IUser} from "../../../types";
import {IUserError} from "../../../types/errors";


export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<IUser[]>(baseUrl);

            return res.data;
        } catch (e: IUserError | any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)