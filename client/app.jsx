import React, { Component } from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

import Count from './components/count';
import Async from './components/async';

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url} render={
            () => (
                <h3>Please select a topic.</h3>
            )}
        />
    </div>
);

const App = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/count">Count</Link></li>
            <li><Link to="/async">Async</Link></li>
            <li><Link to="/topics">Topics</Link></li>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/count" component={Count} />
        <Route path="/async" component={Async} />
        <Route path="/topics" component={Topics} />
    </div>
);

export default App;

