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
    const items = this.service
      .toggle(item)
      .getAll({
        filter: this.state.filter 
      });
    this.setState({ items });
  }

  addItem = item => {
    const items = this.service
      .add(item)
      .getAll({
        filter: this.state.filter
      });
    this.setState({ items });
  };

  updateItem = item => content => {
    let found = this.state.items.find(el => el === item);
    found.content = content;
    const items = this.service
      .update(item, content)
      .getAll({
        filter: this.state.filter
      });
    this.setState({ items });
  }

  removeItem = item => e => {
    let items = this.service
      .delete(item)
      .getAll({
        filter: this.state.filter
      });
    this.setState({ items });
  }

  filterItems = filter => {
    const items = this.service.getAll({ filter });
    this.setState({ filter, items });
  }

  filterAll = e => {
    console.log('filter all')
  }

  filterDone = e => {
    console.log('filter done')
  }

  filterPending = e => {
    console.log('filter pending')
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
        onAll={this.filterAll}
        onDone={this.filterDone}
        onPending={this.filterPending}
        ></TodoFilter>
      </div>
    );
  }
}
