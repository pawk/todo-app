import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem, TodoAdd } from './index';

import './list.css';

export default class TodoList extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  state = {}

  componentWillMount() {
    this.setState({ items: this.props.children });
  }
  
  render() {
    return (
      <div className="todo__list">
        {this.state.items.map((item, key) => React.cloneElement(item, {
          key,
          order: key,
          handleSelection: () => console.log('handling selection!'),
          handleDelete: () => console.log('handling delete!')
        }))}
        <TodoAdd></TodoAdd>
      </div>
    )
  }
}