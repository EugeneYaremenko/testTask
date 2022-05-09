import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
// types
import {AppDispatch, RootState} from "../store/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;