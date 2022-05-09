import {FC, ReactNode} from "react";
// styles
import styles from './Wrapper.module.scss';

interface IWrapperProps {
    children: ReactNode
}

const Wrapper: FC<IWrapperProps> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default Wrapper;