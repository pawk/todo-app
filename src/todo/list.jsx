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

  items = [
      {
        content: 'some list item',
        done: false
      },
      {
        content: 'another list item',
        done: false
      },
      {
        content: 'third item',
        done: false
      },
    ];

  state = {
    items: this.items
  };

  componentWillMount() {
    // this.setState({ items: this.props.children });
  }
  
  TODOparseProvidedElements() {
    return this.state.items.map((item, key) => React.cloneElement(item, {
      key,
      order: key,
      onSelect: this.selectItem,
      onDelete: () => console.log('handling delete!')
    }));
  }


  render() {
    return (
      <div className="todo__list">
        {this.state.items.map(item =>
          <TodoItem
            item={item}
            onSelect={this.selectItem(item)}
            onDelete={this.removeItem(item)}
          >{item.content}</TodoItem>
        )}
        <TodoAdd></TodoAdd>
      </div>
    )
  }

  selectItem = target => e => {
    let items = [...this.state.items];
    let item = items.find(el => el === target);
    item.done = !item.done;
    this.setState({ items });
  }

  removeItem = target => e => {
    let items = [...this.state.items];
    items.splice(target, 1);
    this.setState({ items });
  }
}