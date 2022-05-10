import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types
import {IUser} from "../../../types";
import {fetchUsers} from "../actions/UserActionCreators";


interface IUsersInitialState {
    users: IUser[],
    isLoading: boolean,
    error: string,
}

const initialUsersState: IUsersInitialState = {
    users: [],
    isLoading: false,
    error: '',
};


const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default usersSlice.reducer;