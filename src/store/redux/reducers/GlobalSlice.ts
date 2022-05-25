import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IGlobalInitialState {
    globalLoading: boolean,
    globalError: string | null,
    token: string | null,
}

const initialGlobalState: IGlobalInitialState = {
    globalLoading: false,
    globalError: null,
    token: null,
};


const globalSlice = createSlice({
    name: "global",
    initialState: initialGlobalState,
    reducers: {
        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload;
        },
        setGlobalError(state, action: PayloadAction<string>) {
            state.globalError = action.payload;
        },
        setAuthToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    }
});

export default globalSlice.reducer;

export const {setGlobalLoading, setGlobalError, setAuthToken} = globalSlice.actions;