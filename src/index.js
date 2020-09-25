import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as serviceWorker from './serviceWorker';

// styles
import 'carbon-components/css/carbon-components.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// store
import store from 'store';

// modules
import App from './App';

toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// request.defaults.baseURL = user.profile.endpoint || process.env.REACT_APP_BACKEND_URL;

// dispatch(appAction.setLoadingMessage('(2/3) Authorizing IDF API'));
// request.defaults.headers.common = {
//   // eslint-disable-next-line
//   get ['X-Auth-Token']() {
//     return user.access_token;
//   },
// };
serviceWorker.unregister();
