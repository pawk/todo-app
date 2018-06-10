import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem, TodoAdd } from './index';
import Service from './service';

import './list.css';

export default class TodoList extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  constructor() {
    super();

    this.service = new Service();
  }

  componentWillMount() {
    this.service.add(...this.processChildren());

    this.setState({
      items: this.service.getAll()
    });
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

  selectItem = item => e => {
    let items = this.service.toggle(item).getAll();
    this.setState({ items });
  }

  addItem = item => {
    let items = this.service.add(item).getAll();
    this.setState({ items });
  };

  removeItem = item => e => {
    let items = this.service.delete(item).getAll();
    this.setState({ items });
  }

  render() {
    return (
      <div className="todo__list">
        {this.state.items.map((item, key) =>
          <TodoItem
            key={key}
            item={item}
            onSelect={this.selectItem(item)}
            onDelete={this.removeItem(item)}
          >{item.content}</TodoItem>
        )}
        <TodoAdd onAdd={this.addItem}></TodoAdd>
      </div>
    )
  }
}
