import React, { Component } from 'react';
import './PostList.css';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


function humanizeDate(inputDate) {
  const eventDate = new Date(Date.parse(inputDate));
  return eventDate.toUTCString();
}

class PostList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: null,
    }
  }

  updateMessages() {
    return axios({
      method: 'GET',
      url: `${API_ROOT}/wall/`,
      data: {},
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      const data = response.data;
      if (data.errors === null) {
        this.setState({
          posts: data.data.posts,
        })
      }
    })
  }

  componentDidMount() {
    this.updateMessages();
  }

  render() {
    if (this.state.posts === null) {
      return <h3>Loading messages</h3>
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h2>List of messages</h2>
          </div>
        </div>

        {this.state.posts.map(({ id, message, author_name, created_at }) => {
          return (
            <div key={id} className="jumbotron">
              <p>{message}</p>
              <p className="author_line">{author_name} - {humanizeDate(created_at)}</p>
            </div>
          )
        })}

      </div>
    )
  }
}

export { PostList }
