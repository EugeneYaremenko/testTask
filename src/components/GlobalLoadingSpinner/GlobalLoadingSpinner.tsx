import {FC} from "react";
import {BallTriangle} from "react-loader-spinner";
import Backdrop from '@mui/material/Backdrop';


interface IGlobalLoadingSpinnerProps {
    show: boolean,
}

// doc here: https://www.npmjs.com/package/react-loader-spinner
const GlobalLoadingSpinner: FC<IGlobalLoadingSpinnerProps> = ({show}) => {
    return (
        <>
            {show &&
                <Backdrop
                    sx={{
                        color: '#3F51B5',
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                    open={show}
                >
                    <BallTriangle
                        color="#00BFFF"
                        height={100}
                        width={100}
                        visible={show}/>
                </Backdrop>}
        </>
    )
}

export default GlobalLoadingSpinner;