import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import TopContainer from './Top';
import EventsContainer from './Events';
import EventsNewContainer from './Events/New';
import EventsShowContainer from './Events/Show';
import EventsEditContainer from './Events/Edit';
import EventsTeamsContainer from './Events/Teams';
import EventsTeamsNewContainer from './Events/Teams/New';
import EventsTeamsShowContainer from './Events/Teams/Show';
import EventsTeamsEditContainer from './Events/Teams/Edit';

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

      <Switch>
        <Route exact={true} path="/" component={TopContainer} />
        <Route exact={true} path="/events" component={EventsContainer} />
        <Route exact={true} path="/events/new" component={EventsNewContainer} />
        <Route exact={true} path="/events/:event_id" component={EventsShowContainer} />
        <Route exact={true} path="/events/:event_id/edit" component={EventsEditContainer} />
        <Route exact={true} path="/events/:event_id/teams" component={EventsTeamsContainer} />
        <Route exact={true} path="/events/:event_id/teams/new" component={EventsTeamsNewContainer} />
        <Route exact={true} path="/events/:event_id/teams/:team_id" component={EventsTeamsShowContainer} />
        <Route exact={true} path="/events/:event_id/teams/:team_id/edit" component={EventsTeamsEditContainer} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
