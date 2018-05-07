import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class NewPostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
    }

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMessage(event) {
    this.setState({ message: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    return axios({
      method: 'POST',
      url: `${API_ROOT}/wall/`,
      data: {
        message: this.state.message,
      },
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      const data = response.data;
      if (data.errors === null) {
        this.props.updatePosts();
      }
    })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return null
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <h2>Post a new message</h2>
          <form className="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sr-only" htmlFor="newpost_message">Message</label>
              <textarea id="newpost_message" className="form-control" rows="3" onChange={this.handleChangeMessage} value={this.state.message} />
            </div>
            <button type="submit" className="btn btn-primary">Post new message to wall</button>
          </form>
        </div>
        <hr />
      </div>
    )
  }
}

export { NewPostForm }
