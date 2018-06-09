import React from 'react';

export class TodoItem extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}