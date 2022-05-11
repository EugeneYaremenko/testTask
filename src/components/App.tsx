import React, {FC} from 'react';
// redux
import {useAppSelector} from "../hooks/redux";
// components
import Wrapper from "./Wrapper";
import NavBar from "./NavBar";
import MainText from "./MainText";
import UsersList from "./UsersList/UsersList";
import {ToastContainer} from "react-toastify";
import GlobalLoadingSpinner from "./GlobalLoadingSpiner";



const App: FC = () => {
    const {globalLoading} = useAppSelector(state => state.globalSlice);

    return (
        <>
            <Wrapper>
                <NavBar/>
                <MainText/>
                <UsersList/>
            </Wrapper>
            <ToastContainer/>
            <GlobalLoadingSpinner show={globalLoading}/>
        </>
    );
}

export default App;
