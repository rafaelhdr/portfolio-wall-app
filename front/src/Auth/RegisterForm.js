import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      readonly: false,
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value })
  }

  handleChangeFirstName(event) {
    this.setState({ first_name: event.target.value })
  }

  handleChangeLastName(event) {
    this.setState({ last_name: event.target.value })
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    /*
     * Make request to the server to register user.
     * If it is OK, update user in <App />
     */
    event.preventDefault();

    this.setState({'readonly': true,});

    return axios({
      method: 'POST',
      url: `${API_ROOT}/auth/register`,
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
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
    }).catch((error) => {
      this.setState({'readonly': false,});
      console.error(error);
    })
  }

  render() {
    return (
      <form className="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" htmlFor="username">Username</label>
          <input type="text" className="form-control" id="register_username" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="first_name">First name</label>
          <input type="text" className="form-control" id="register_first_name" placeholder="First name" value={this.state.first_name} onChange={this.handleChangeFirstName} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="last_name">Last name</label>
          <input type="text" className="form-control" id="register_last_name" placeholder="Last name" value={this.state.last_name} onChange={this.handleChangeLastName} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="register_email" placeholder="Email address" value={this.state.email} onChange={this.handleChangeEmail} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="register_password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} required readOnly={this.state.readonly} />
        </div>
        <div className="form-group">
          <button id="register_submit" type="submit" className="btn btn-primary btn-block" disabled={this.state.readonly}>Register</button>
        </div>
      </form>
    )
  }
}

export { RegisterForm }
