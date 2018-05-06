import React, { Component } from 'react';
import { NewPostForm } from './NewPostForm.js';
import { PostList } from './PostList.js';


class WallMain extends Component {

  render() {
    return (
      <div className="container">

        <NewPostForm
          isAuthenticated={this.props.isAuthenticated}
        />
        <PostList />

      </div>
    )
  }
}

export { WallMain }
