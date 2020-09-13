import React, { Component } from 'react';
import { NewPostForm } from './NewPostForm.js';
import { PostList } from './PostList.js';
import { API_ROOT } from '../ApiConfig.js';
import axios from "axios";


class WallMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    }
  }

  updatePosts() {
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
    this.updatePosts();
  }

  render() {
    return (
      <div className="container">

        <NewPostForm
          isAuthenticated={this.props.isAuthenticated}
          updatePosts={() => this.updatePosts()}
        />
        <PostList
          posts={this.state.posts}
          user={this.props.user}
        />

      </div>
    )
  }
}

export { WallMain }
