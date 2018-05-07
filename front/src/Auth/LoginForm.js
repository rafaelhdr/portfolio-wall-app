import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      readonly: false,
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

    this.setState({'readonly': true,});

    return axios({
      method: 'POST',
      url: `${API_ROOT}/auth/login`,
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.setState({'readonly': false,});
      const data = response.data;
      if (data.errors === null) {
        this.props.setUser({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
        });
      }
    }).catch((err) => {
      this.setState({'readonly': false,});
      console.error(err);
    })
  }

  render() {
    return (
      <form className="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" htmlFor="username">Username</label>
          <input type="text" className="form-control" id="login_username" placeholder="Username" onChange={this.handleChangeUsername} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="login_password">Password</label>
          <input type="password" className="form-control" id="login_password" placeholder="Password" onChange={this.handleChangePassword} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block" id="login_submit" disabled={this.state.readonly}>Login</button>
        </div>
      </form>
    )
  }
}

export { LoginForm }
