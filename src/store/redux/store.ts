import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'
// rtk query
import {userAPI} from "../../services/UserService";
// slice
import userSlice from "./reducers/UsersSlice";


const rootReducer = combineReducers({
    userSlice,
    [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
