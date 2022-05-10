import React, {FC} from 'react';
// components
import Wrapper from "./Wrapper";
import NavBar from "./NavBar";
import MainText from "./MainText";
import UsersList from "./UsersList/UsersList";


const App: FC = () => {
    return (
        <>
            <Wrapper>
                <NavBar/>
                <MainText/>
                <UsersList/>
            </Wrapper>
        </>
    );
}

export default App;
