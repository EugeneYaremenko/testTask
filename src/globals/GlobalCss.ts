import variables from "../const/variables.scss";
import {createTheme} from "@mui/material/styles";


export const defaultTheme = createTheme({
    palette: {
        secondary: {
            main: variables.secondaryColor,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 0',
                    color: variables.mainTextColor,
                    backgroundColor: variables.primaryColor,
                    borderRadius: '80px',
                    textTransform: 'none',
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '26px',
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
        },

        MuiRadio: {
            styleOverrides: {
                root: {
                    color: variables.greyBackgroundColor,
                },
            }
        }
    }
});



