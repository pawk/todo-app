import React from 'react';

import * as style from './item.css';

export class TodoItem extends React.Component {
  render() {
    return (
      <div className="todo__item">
        <div><input type="checkbox" /></div>
        <div>{this.props.children}</div>
        <div><button className="todo__item-delete-btn">- Delete</button></div>
      </div>
    );
  }
}