import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";

class Logout extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    return axios({
      method: 'POST',
      url: `${API_ROOT}/auth/logout`,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      const data = response.data;
      if (data.errors === null) {
        this.props.setUser(null);
      }
    })
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a className="hover-pointer" onClick={this.handleLogout}>Logout</a></li>
      </ul>
    )
  }
}

export { Logout }
