import React, { Component } from 'react';
import { checkUser } from '../Auth/Me.js'
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
    const user_id = this.props.user && this.props.user.id;

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h2>List of messages</h2>
          </div>
        </div>

        {this.props.posts.map(({ id, message, author_id, author_name, created_at }) => {
          return (
            <div key={id} className="jumbotron">
              <p>{message}</p>
              <p className="author_line">
                {author_id == user_id && <strong>(Author) </strong>}
                {author_name} - {humanizeDate(created_at)}
              </p>
            </div>
          )
        })}

      </div>
    )
  }
}

export { PostList }
