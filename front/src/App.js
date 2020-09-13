import React, { Component } from 'react';
import './App.css';
import { LoginMenu } from './Auth/Sign.js'
import { checkUser } from './Auth/Me.js'
import { WallMain } from './Wall/WallMain.js';
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFToken";


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">Wall App</a>
          </div>

          <LoginMenu
            isAuthenticated={this.props.isAuthenticated}
            setUser={this.props.setUser}
          />

        </div>
      </nav>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
    }
  }

  componentDidMount() {
    checkUser((user) => this.setUser(user))
  }

  setUser(user) {
    this.setState({
      user: user,
      isAuthenticated: (user != null),
    })
  }

  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          setUser={(user) => this.setUser(user)}
        />
        <WallMain
          isAuthenticated={this.state.isAuthenticated}
          setUser={(user) => this.setUser(user)}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
