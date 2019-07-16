import React, { Component } from "react";

import { login } from "../../util/api";
import { ACCESS_TOKEN } from "../../util/const";

import "./Login.css";


class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleUsernameChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      username: value
    });
  }

  handlePasswordChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      password: value
    });
  }

  handleSubmit = () => {
    const loginRequest = { 
      username: this.state.username, 
      password: this.state.password
    };

    login(loginRequest)
      .then(response => {
        console.log(response);
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        this.props.onLogIn(this.props.history);
      }).catch(error => {
        console.log(JSON.parse(JSON.stringify(error)).response.data.status);
      });; 
  }

  render() {

    const { username, password } = this.state;
    
    return(
      <div className="login-div">
        <div className="login-background">
          <p className="warning">{ warning }</p>
            <span className="field-name-span">логин:</span>
            <input
              type="text"
              value= { username } 
              id="username-input" 
              className="login-input" 
              onChange={ this.handleUsernameChange }
            />
            <span 
              id="password-span" 
              className="field-name-span"
              onMouseDown={ this.showPassword }
              onMouseUp={ this.hidePassword }>пароль:</span>
            <input 
              type="password"
              value= { password }
              id="password-input" 
              className="login-input"
              onChange={ this.handlePasswordChange }
            />
            <button 
              className="login-button"
              onClick={ this.handleSubmit }>
                обрести свободу
            </button>
        </div>
      </div>
    );
  }
}

const warning = "Если Вы не знаете, куда попали, прошу, покиньте эту территорию, ведь Вы не отыщите здесь того, чего хотите."

export default Login;