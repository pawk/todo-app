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
    const children = this.processChildren();
    if (children) {
      this.setState({ items: [...this.state.items, ...children] });
    }    
  }

  processChildren() {
    if (!this.props.children) {
      return null;
    }
    return this.props.children.map(child => {
      const { done, children: content } = child.props;
      return { done, content };
    });
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