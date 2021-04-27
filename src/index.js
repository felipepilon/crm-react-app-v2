import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import pickerPtBrLocale from "date-fns/locale/pt-BR";
import { BrowserRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider, { AuthContext } from './contexts/Auth';
import { IntlProvider } from 'react-intl';

import intlPtBrLocale from './locales/pt-br';
import AppStateContextProvider from './v2/contexts/AppState';

import AbilityContextProvider from './contexts/Can';

const intlLocales = {
  "pt-br": intlPtBrLocale, 
};

const pickerLocales = {
  "pt-br": pickerPtBrLocale, 
}

const theme = createMuiTheme({
  spacing: 8,
  palette: {
      primary: {
          main: "#000000",
      }
      , secondary: {
          main: "#ffffff",
      }
  }
});

ReactDOM.render(
    <BrowserRouter>
      <AppStateContextProvider>
        <AbilityContextProvider>
          <AuthContextProvider>
            <AuthContext.Consumer>{() => (
              <ThemeProvider theme={theme}>
                <IntlProvider 
                  locale='pt-br' 
                  key='pt-br' 
                  messages={intlLocales['pt-br']}
                  onError={(message) => message}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pickerLocales['pt-br']}>
                    <App/>
                  </MuiPickersUtilsProvider>
                </IntlProvider>
              </ThemeProvider>

            )}</AuthContext.Consumer>
          </AuthContextProvider>
        </AbilityContextProvider>
      </AppStateContextProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

console.log(`[ENV=${(process.env.NODE_ENV || "NOT DEFINED")}]`);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
