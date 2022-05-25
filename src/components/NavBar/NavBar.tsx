import {FC} from "react";
// styles
import styles from "./NavBar.module.scss";
// components
import {Button} from "@mui/material";
import {Link} from 'react-scroll';

const NavBar: FC = () => {
    return (
        <header className={styles.navBar}>
            <nav className={styles.navigation}>
                <div className={styles.navigation__logo}></div>

                <div className={styles.navigation__buttons}>
                    <Link
                        to="users"
                        spy={true}
                        smooth={true}
                        duration={500}>
                        <Button>Users</Button>
                    </Link>

                    <Link
                        to="signUpForm"
                        spy={true}
                        smooth={true}
                        duration={500}>
                        <Button>Sign up</Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;