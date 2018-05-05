import React, { Component } from 'react';
import { RegisterForm } from './RegisterForm.js';

class LoginMenu extends Component {

  render() {

    if (this.props.isAuthenticated) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a className="hover-pointer">Logout</a></li>
        </ul>
      )
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown"><b>Login or Register</b> <span className="caret"></span></a>
          <ul id="login-dp" className="dropdown-menu">
            <li>
              <div className="row">
                <div className="col-md-12">
                  <span>Login</span>
                  <form className="form" acceptCharset="UTF-8">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="login_email">Email address</label>
                      <input type="email" className="form-control" id="login_email" placeholder="Email address" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only" htmlFor="login_password">Password</label>
                      <input type="password" className="form-control" id="login_password" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                  </form>
                  <span>or Register</span>
                  <RegisterForm
                    setUser={this.props.setUser}
                  />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
}

export { LoginMenu }
