import axios from "axios";
// redux
import {createAsyncThunk} from "@reduxjs/toolkit";
// types
import {IUser} from "../../../types";


export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<IUser[]>('');

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("error!")
        }
    }
)