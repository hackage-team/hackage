import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TopContainer from './Top';
import LoginContainer from './Login';
import UsersContainer from './Users';
import EventsContainer from './Events';
import EventsNewContainer from './Events/New';
import EventsShowContainer from './Events/Show';
import EventsEditContainer from './Events/Edit';
import EventsTeamsContainer from './Events/Teams';
import EventsTeamsNewContainer from './Events/Teams/New';
import EventsTeamsShowContainer from './Events/Teams/Show';
import EventsTeamsEditContainer from './Events/Teams/Edit';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={TopContainer} />
      <Route exact={true} path="/login" component={LoginContainer} />
      <Route exact={true} path="/users/:uid" component={UsersContainer} />
      <Route exact={true} path="/events" component={EventsContainer} />
      <Route exact={true} path="/events/new" component={EventsNewContainer} />
      <Route exact={true} path="/events/:event_id" component={EventsShowContainer} />
      <Route exact={true} path="/events/:event_id/edit" component={EventsEditContainer} />
      <Route exact={true} path="/events/:event_id/teams" component={EventsTeamsContainer} />
      <Route exact={true} path="/events/:event_id/teams/new" component={EventsTeamsNewContainer} />
      <Route exact={true} path="/events/:event_id/teams/:team_id" component={EventsTeamsShowContainer} />
      <Route exact={true} path="/events/:event_id/teams/:team_id/edit" component={EventsTeamsEditContainer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
