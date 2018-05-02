import React, { Component } from 'react';
import './App.css';
import { LoginMenu } from './Auth/Sign.js'

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
          />

        </div>
      </nav>
    )
  }
}

class Main extends Component {

  render() {
    return (
      <div className="container">

        <div className="jumbotron">
          <h2>My first wall message</h2>
          <p>This is my first wall message. It is static and in the source-code (not dynamic from any database).</p>
        </div>

      </div>
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

  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
        />
        <Main />
      </div>
    );
  }
}

export default App;
