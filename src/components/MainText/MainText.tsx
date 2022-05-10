import React, {FC} from "react";
// styles
import styles from "./MainText.module.scss";
// components
import {Button} from "@mui/material";

const MainText: FC = () => {
    return (
        <section className={styles.mainText}>
            <h1 className={styles.mainText__title}>Test assignment for front-end developer</h1>

            <p className={styles.mainText__description}>
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
                understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
                They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </p>

            <Button>Sign up</Button>
        </section>
    )
};

export default MainText;