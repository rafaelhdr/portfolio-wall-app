import React, { Component } from 'react';
import { NewPostForm } from './NewPostForm.js';


class WallMain extends Component {

  render() {
    return (
      <div className="container">

        <NewPostForm
          isAuthenticated={this.props.isAuthenticated}
        />
        <div className="row">
          <div className="col-sm-12">
            <h2>List of messages</h2>
          </div>
        </div>

        <div className="jumbotron">
          <h2>My first wall message</h2>
          <p>This is my first wall message. It is static and in the source-code (not dynamic from any database).</p>
        </div>

      </div>
    )
  }
}

export { WallMain }
