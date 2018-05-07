import React, { Component } from 'react';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class NewPostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      readonly: false,
    }

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMessage(event) {
    this.setState({ message: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({'readonly': true,});

    return axios({
      method: 'POST',
      url: `${API_ROOT}/wall/`,
      data: {
        message: this.state.message,
      },
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.setState({'readonly': false,});
      this.setState({ message: '' })
      const data = response.data;
      if (data.errors === null) {
        this.props.updatePosts();
      }
    }).catch((err) => {
      this.setState({'readonly': false,});
      console.error(err);
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
              <textarea id="newpost_message" className="form-control" rows="3" onChange={this.handleChangeMessage} value={this.state.message} readOnly={this.state.readonly} />
            </div>
            <button id="newpost_submit" type="submit" className="btn btn-primary" disabled={this.state.readonly}>Post new message to wall</button>
          </form>
        </div>
        <hr />
      </div>
    )
  }
}

export { NewPostForm }
