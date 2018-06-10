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
    this.service.addMany(this.processChildren());

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
        <TodoAdd></TodoAdd>
      </div>
    )
  }

  selectItem = item => e => {
    let items = this.service
      .toggle(item)
      .getAll();
    this.setState({ items });
  }

  removeItem = target => e => {
    let items = [...this.state.items];
    items.splice(target, 1);
    this.setState({ items });
  }
}
