import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from './material-ui-development';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50'
        },
        secondary: {
            main: '#ff9100'
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
