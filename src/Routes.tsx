import * as React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Base from './components/Base';

// NOTE: Stats and settings tabs are stubbed for future development, but have
//       no content currently.
export default (
    <Route component={App}>
        <Route component={Layout}>
            <Route path="/" component={Base}>
                <Route path="dashboard" component={Dashboard} />
                <Route path="stats" component={Stats} />
                <Route path="settings" component={Settings} />
            </Route>
            <Redirect from="/" to="dashboard"/>
        </Route>
    </Route>
);
