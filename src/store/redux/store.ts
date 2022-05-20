import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'
// rtk query
import {userAPI} from "../../services/UserService";
import {authAPI} from "../../services/AuthService";
// slices
import globalSlice from "./reducers/GlobalSlice";
import userSlice from "./reducers/UsersSlice";
import authSlice from "./reducers/AuthSlice";


const rootReducer = combineReducers({
    globalSlice,
    userSlice,
    authSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
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
