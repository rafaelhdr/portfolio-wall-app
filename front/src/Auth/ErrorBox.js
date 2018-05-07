import React, { Component } from 'react';


class ErrorBox extends Component {

  render() {
    if (this.props.error == null) {
      return null;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.error}
      </div>
    );
  }
}

export { ErrorBox }
