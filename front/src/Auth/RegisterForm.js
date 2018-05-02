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
    event.preventDefault();

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
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <form className="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} required />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="first_name">First name</label>
          <input type="text" className="form-control" id="first_name" placeholder="First name" value={this.state.first_name} onChange={this.handleChangeFirstName} required />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="last_name">Last name</label>
          <input type="text" className="form-control" id="last_name" placeholder="Last name" value={this.state.last_name} onChange={this.handleChangeLastName} required />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleChangeEmail} required />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} required />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </div>
      </form>
    )
  }
}

export { RegisterForm }
