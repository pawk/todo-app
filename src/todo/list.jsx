import React from 'react';
import PropTypes from 'prop-types';

// TODO - break imports 
import { TodoItem, TodoAdd } from './index';
import TodoFilter from './filter';
import Service from './service';

import './list.css';

export default class TodoList extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  state = {
    items: null,
    filter: null
  }

  constructor() {
    super();

    this.service = new Service();
  }

  componentWillMount() {
    if (!this.service.getAll().length) {
      this.service.add(...this.processChildren());
    }

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
    const { filter, done } = this.state;
    const items = this.service
      .toggle(item)
      .getAll({ filter, done });
    this.setState({ items });
  }

  addItem = item => {
    const { filter, done } = this.state;
    const items = this.service
      .add(item)
      .getAll({ filter, done });
    this.setState({ items });
  };

  updateItem = item => content => {
    const { filter, done } = this.state;
    let found = this.state.items.find(el => el === item);
    found.content = content;
    const items = this.service
      .update(item, content)
      .getAll({ filter, done });
    this.setState({ items });
  }

  removeItem = item => e => {
    const { filter, done } = this.state;
    let items = this.service
      .delete(item)
      .getAll({ filter, done });
    this.setState({ items });
  }

  filterItems = filter => {
    const { done } = this.state;
    const items = this.service.getAll({ filter, done });
    this.setState({ filter, items });
  }

  filterWithDone = done => e => {
    const { filter } = this.state;
    const items = this.service
      .getAll({ filter, done });
    this.setState({ items, done });
  }

  render() {
    return (
      <div className="todo__list">
        <TodoAdd onAdd={this.addItem}></TodoAdd>
        {this.state.items.map((item, key) =>
          <TodoItem
            key={item.id}
            item={item}
            onSelect={this.selectItem(item)}
            onDelete={this.removeItem(item)}
            onUpdate={this.updateItem(item)}
          >{item.content}</TodoItem>
        )}
      <TodoFilter
        onFilter={this.filterItems}
        onAll={this.filterWithDone(null)}
        onDone={this.filterWithDone(true)}
        onPending={this.filterWithDone(false)}
        ></TodoFilter>
      </div>
    );
  }
}
