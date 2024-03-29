import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
// import 'carbon-components/css/carbon-components.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import './index.css';
// store
import store from 'store';

// modules
import App from './App';
import Project from 'modules/Project/Project';
import Layout from 'components/Layout';

toast.configure();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router basename="/">
      <Switch>
        <Layout>
          <Route exact path="/" component={Project} />
          <Route exact path="/project/:id" component={App} />
        </Layout>
      </Switch>
    </Router>
  </Provider>,
);
