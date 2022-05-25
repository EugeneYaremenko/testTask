import React, {FC, useEffect} from 'react';
import {ToastContainer} from "react-toastify";
// redux
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setAuthToken} from "../store/redux/reducers/GlobalSlice";
import {authAPI} from "../store/redux/services/AuthService";
// components
import GlobalLoadingSpinner from "./GlobalLoadingSpinner";
import Wrapper from "./Wrapper";
import NavBar from "./NavBar";
import MainText from "./MainText";
import UsersList from "./UsersList/UsersList";
import SignUpForm from "./SignUpForm";


const App: FC = () => {
    const dispatch = useAppDispatch();
    const {globalLoading} = useAppSelector(state => state.globalSlice);
    const {data: tokenData} = authAPI.useGetAuthTokenQuery();


    useEffect(()=> {
        if(tokenData){
            dispatch(setAuthToken(tokenData.token))
        }
    }, [tokenData]);

    return (
        <>
            <Wrapper>
                <NavBar/>
                <MainText/>
                <UsersList/>
                <SignUpForm/>
            </Wrapper>

            <ToastContainer/>
            <GlobalLoadingSpinner show={globalLoading}/>
        </>
    );
}

export default App;
