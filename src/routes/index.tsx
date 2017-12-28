import * as React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { App, Layout, Base } from '../components';

import Dashboard from './Dashboard';
import Stats from './Stats';
import Settings from './Settings';


// NOTE: Stats and settings tabs are stubbed for future development, but have
//       no content currently.
export default (
    <Route component={App}>
        <Route component={Layout}>
            <Route exact path="/" render={ () => <Redirect to="/dashboard"/> }>
                <Route path="dashboard" component={Dashboard} />
                <Route path="stats" component={Stats} />
                <Route path="settings" component={Settings} />
            </Route>
        </Route>
    </Route>
);
