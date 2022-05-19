import React from 'react';
import ReactDOM from 'react-dom/client';
// styles
import './index.scss';
import "react-toastify/dist/ReactToastify.css";
import {ThemeProvider} from "@mui/material/styles";
import {defaultTheme} from "./globals/GlobalCss";
// redux
import {Provider} from "react-redux";
import {setupStore} from "./store/redux/store";
// components
import App from './components/App';


const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
            <App/>
        </ThemeProvider>
    </Provider>
);
