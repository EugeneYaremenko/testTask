import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types
import {IUser, IUserPosition} from "../../../types";
import {fetchUsers, fetchUsersPositions} from "../actions/UserActionCreators";


interface IUsersInitialState {
    users: IUser[],
    usersPositions: IUserPosition[],
    isLoading: boolean,
    error: string,
}

const initialUsersState: IUsersInitialState = {
    users: [],
    usersPositions: [],
    isLoading: false,
    error: '',
};


const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {},
    extraReducers: {
        // fetchUsers
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
        },
        // fetchUsersPositions
        [fetchUsersPositions.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsersPositions.fulfilled.type]: (state, action: PayloadAction<IUserPosition[]>) => {
            state.isLoading = false;
            state.error = '';
            state.usersPositions = action.payload;
        },
        [fetchUsersPositions.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default usersSlice.reducer;