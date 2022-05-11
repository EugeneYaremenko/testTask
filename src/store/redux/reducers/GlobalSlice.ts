import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IGlobalInitialState {
    globalLoading: boolean,
    globalError: string | null,
}

const initialGlobalState: IGlobalInitialState = {
    globalLoading: false,
    globalError: null,
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
    }
});

export default globalSlice.reducer;

export const {setGlobalLoading, setGlobalError} = globalSlice.actions;