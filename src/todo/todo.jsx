import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';

import TodoAdd from './add';
import TodoList from './list';
import TodoFilter from './filter';
import Service from './service';

import './todo.css';

export default class Todo extends React.Component {
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
    let items = this.service.getAll();
    if (!items.length) {
      this.service.add(...this.processChildren());
      items = this.service.getAll();
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

  selectItem = item => {
    this.service.toggle(item);
    this.updateState();
  }

  addItem = item => {
    this.service.add(item);
    this.updateState();
  };

  updateItem = (item, content) => {
    let found = this.state.items.find(el => el === item);
    found.content = content;
    this.service.update(item, content);
    this.updateState();
  }

  removeItem = item => {
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

  sortItems = ({oldIndex, newIndex}) => {
    this.service
      .reorder(arrayMove(this.state.items, oldIndex, newIndex));
    this.updateState();
  };

  render() {
    return (
      <section className="todo">
        <TodoAdd onAdd={this.addItem}></TodoAdd>
        <TodoList 
          items={this.state.items}
          onSelect={this.selectItem}
          onUpdate={this.updateItem}
          onRemove={this.removeItem}
          onSortEnd={this.sortItems}
        />
        <TodoFilter
          value={this.state.filter}
          onFilter={this.filterItems}
          onAll={this.filterWithDone(null)}
          onDone={this.filterWithDone(true)}
          onPending={this.filterWithDone(false)}
        />
      </section>
    );
  }
}
