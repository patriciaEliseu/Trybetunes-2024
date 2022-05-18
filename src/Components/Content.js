import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            path="/search"
            component={ Search }
          />
          <Route
            path="/album/:id"
            component={ Album }
          />
          <Route
            path="/favorites"
            component={ Favorites }
          />
          <Route
            path="/profile"
            component={ Profile }
            exact
          />
          <Route
            path="/profile/edit"
            component={ ProfileEdit }
          />
          <Route
            path="*"
            component={ NotFound }
            exact
          />
        </Switch>
      </div>
    );
  }
}

export default Content;
