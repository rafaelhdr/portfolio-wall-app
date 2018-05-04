import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value })
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    /*
     * Make request to the server to login user.
     * If it is OK, update user in <App />
     */
    event.preventDefault();

    return axios({
      method: 'POST',
      url: `${API_ROOT}/auth/login`,
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      const data = response.data;
      if (data.errors === null) {
        this.props.setUser({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
        });
      }
    })
  }

  render() {
    return (
      <form className="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" htmlFor="username">Username</label>
          <input type="text" className="form-control" id="login_username" placeholder="Username" onChange={this.handleChangeUsername} required />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="login_password">Password</label>
          <input type="password" className="form-control" id="login_password" placeholder="Password" onChange={this.handleChangePassword} required />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </div>
      </form>
    )
  }
}

export { LoginForm }
