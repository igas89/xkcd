import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';
import Main from 'pages/Main';
import GlobalStyle from 'themes/GlobalStyle';
import ThemesProvider from 'themes/ThemesProvider';

const App: FC = () => (
  <Provider store={store}>
    <ThemesProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/' >
            <Main />
          </Route>
        </Switch>
      </Router>
    </ThemesProvider>
  </Provider>
);

export default App;
