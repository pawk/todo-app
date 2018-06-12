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

  constructor(props) {
    super(props);
    this.service = new Service();
  }

  componentWillMount() {
    const { filter, done } = this.state;
    const items = this.service.getAll({ filter, done });
    if (!items.length) {
      this.service.add(...this.processChildren());
    }
    this.setState({ items });
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

  updateState({ filter, done } = this.state) {
    const items = this.service.getAll({ filter, done });
    this.setState({ filter, done, items });
  }

  selectItem = item => e => {
    this.service.toggle(item);
    this.updateState();
  }

  addItem = item => {
    this.service.add(item);
    this.updateState();
  };

  updateItem = item => content => {
    let found = this.state.items.find(el => el === item);
    found.content = content;
    this.service.update(item, content);
    this.updateState();
  }

  removeItem = item => e => {
    this.service.delete(item);
    this.updateState();
  }

  filterItems = filter => {
    const { done } = this.state;
    this.updateState({ filter, done });
  }

  filterWithDone = done => e => {
    const { filter } = this.state;
    this.updateState({ filter, done });
  }

  render() {
    return (
      <section className="todo__list">
        <TodoAdd onAdd={this.addItem}></TodoAdd>
        <ul>
          {this.state.items.map((item, key) =>
            <li key={item.id}>
              <TodoItem
                key={item.id}
                item={item}
                onSelect={this.selectItem(item)}
                onDelete={this.removeItem(item)}
                onUpdate={this.updateItem(item)}
              >{item.content}</TodoItem>
            </li>
          )}
        </ul>
      <TodoFilter
        onFilter={this.filterItems}
        onAll={this.filterWithDone(null)}
        onDone={this.filterWithDone(true)}
        onPending={this.filterWithDone(false)}
        ></TodoFilter>
      </section>
    );
  }
}
