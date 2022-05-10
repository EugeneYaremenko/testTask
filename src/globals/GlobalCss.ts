import variables from "../const/variables.scss";
import {createTheme} from "@mui/material/styles";


export const defaultButtonTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 0',
                    color: variables.mainTextColor,
                    backgroundColor: variables.primaryColor,
                    borderRadius: '80px',
                    textTransform: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: variables.buttonHoverColor,
                    },
                    '&:disabled': {
                        color: variables.whiteTextColor,
                        backgroundColor: variables.buttonDisabledColor,
                    },
                }
            }
        }
    }
});