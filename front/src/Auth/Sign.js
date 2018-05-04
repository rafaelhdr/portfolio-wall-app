import React, { Component } from 'react';
import { LoginForm } from './LoginForm.js';
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
                  <LoginForm
                    setUser={this.props.setUser}
                  />
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
