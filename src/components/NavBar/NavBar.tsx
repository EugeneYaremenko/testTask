import {FC} from "react"
// styles
import styles from "./NavBar.module.scss";
// components
import {Button} from "@mui/material";


const NavBar: FC = () => {
    return (
        <header className={styles.navBar}>
            <nav className={styles.navigation}>
                <div className={styles.navigation__logo}></div>

                <div className={styles.navigation__buttons}>
                    <Button>Users</Button>
                    <Button>Sign up</Button>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;