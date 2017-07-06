import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Layout from './components/Layout';

import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Settings from './components/Settings';


// When user is at "/", show the "PostsIndex" component
export default (
    <Route path="/" component={App}>
        <Route component={Layout}>
            <IndexRoute component={Dashboard} />
            <Route path="stats" component={Stats} />
            <Route path="settings" component={Settings} />
        </Route>
    </Route>
);
