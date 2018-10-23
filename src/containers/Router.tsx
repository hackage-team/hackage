import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import TopContainer from './Top';
import EventsContainer from './Events';

const Router = (_props: {}) => (
  <BrowserRouter>
    <div>
      <ul>
        <li>
          <Link to="/">Top</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
      </ul>

      <hr />

      <Route exact={true} path="/" component={TopContainer} />
      <Route exact={true} path="/events" component={EventsContainer} />
    </div>
  </BrowserRouter>
);

export default Router;
