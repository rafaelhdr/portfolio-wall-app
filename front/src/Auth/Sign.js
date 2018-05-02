import React, { Component } from 'react';

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
          <a className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
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
                  <form className="form" acceptCharset="UTF-8">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="register_username">Username</label>
                      <input type="text" className="form-control" id="register_username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only" htmlFor="register_first_name">First name</label>
                      <input type="text" className="form-control" id="register_first_name" placeholder="First name" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only" htmlFor="register_last_name">Last name</label>
                      <input type="text" className="form-control" id="register_last_name" placeholder="Last name" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only" htmlFor="register_email">Email address</label>
                      <input type="email" className="form-control" id="register_email" placeholder="Email address" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only" htmlFor="register_password">Password</label>
                      <input type="password" className="form-control" id="register_password" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>
                  </form>
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
