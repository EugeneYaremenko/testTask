import React, {FC} from 'react';
import {ToastContainer} from "react-toastify";
// redux
import {useAppSelector} from "../hooks/redux";
// components
import GlobalLoadingSpinner from "./GlobalLoadingSpinner";
import Wrapper from "./Wrapper";
import NavBar from "./NavBar";
import MainText from "./MainText";
import UsersList from "./UsersList/UsersList";
import SignUpForm from "./SignUpForm";


const App: FC = () => {
    const {globalLoading} = useAppSelector(state => state.globalSlice);

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
