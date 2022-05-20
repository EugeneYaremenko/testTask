import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types
import {authToken} from "../actions/AuthActionCreators";
import {IAuthToken} from "../../../types";


interface IAuthInitialState {
    token: string,
    isLoading: boolean,
    error: string,
}

const initialUsersState: IAuthInitialState = {
    token: '',
    isLoading: false,
    error: '',
};


const authSlice = createSlice({
    name: "auth",
    initialState: initialUsersState,
    reducers: {},
    extraReducers: {
        [authToken.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authToken.fulfilled.type]: (state, action: PayloadAction<IAuthToken>) => {
            state.isLoading = false;
            state.error = '';
            state.token = action.payload.token;
        },
        [authToken.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;