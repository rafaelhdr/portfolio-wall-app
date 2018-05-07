import React, { Component } from 'react';
import './PostList.css';


function humanizeDate(inputDate) {
  const eventDate = new Date(Date.parse(inputDate));
  return eventDate.toUTCString();
}

class PostList extends Component {

  render() {
    if (this.props.posts === null) {
      return <h3>Loading messages</h3>
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h2>List of messages</h2>
          </div>
        </div>

        {this.props.posts.map(({ id, message, author_name, created_at }) => {
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
