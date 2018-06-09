import React from 'react';
import PropTypes from 'prop-types';

import './list.css';

export default class TodoList extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  state = []

  componentWillMount() {
    this.setState({ items: this.props.children });
  }
  
  render() {
    return (
      <div className="todo__list">
        {this.state.items.map((item, key) => React.cloneElement(item, {
          key
        }))}
        <button className="todo__add-btn">+ Add</button>
      </div>
    )
  }
}