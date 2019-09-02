import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Public from "../public/Public";
import PrivateRoute from "../private-route/PrivateRoute";
import Login from "../login/Login";
import Authorship from "../authorship/authorship/Authorship";

import { checkAuth } from "../../util/api";
import { ACCESS_TOKEN } from "../../util/const";

import './App.css';


class App extends Component {

  state = {
    isAuthenticated: false
  }

  componentWillReceiveProps = async () => {
    await checkAuth()
      .then(response => {
        if(response.status === 200) {
          this.setState({
            isAuthenticated: true
          });
      }}).catch(error => {
        this.setState({
          isAuthenticated: false
        });
      });
  }

  handleLogIn = (history) => {
    this.setState({
      isAuthenticated: true
    });
    history.push("/authorship/letters/last");
  }

  handleLogOut = (history) => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      isAuthenticated: false
    });

    history.push("/public/letters/last");
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exect path={ `/public/letters/:id` } component={ Public } />
            <Route path="/login" component={ (props) => <Login onLogIn={ this.handleLogIn } { ...props } /> } />
            <PrivateRoute 
              authenticated={ this.state.isAuthenticated } 
              onLogOut= { this.handleLogOut }
              path="/authorship/letters/:id" 
              component={ Authorship }
            />
            <Redirect from="/" to="/public/letters/last" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;