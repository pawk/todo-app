import React from 'react';
import PropTypes from 'prop-types';

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

  updateList({ filter, done } = this.state) {
    const items = this.service.getAll({ filter, done });
    this.setState({ filter, done, items });
  }

  selectItem = item => {
    this.service.toggle(item);
    this.updateList();
  }

  addItem = item => {
    this.service.add(item);
    this.updateList();
  };

  updateItem = (item, content) => {
    let found = this.state.items.find(el => el === item);
    found.content = content;
    this.service.update(item, content);
    this.updateList();
  }

  removeItem = item => {
    this.service.delete(item);
    this.updateList();
  }

  filterItems = filter => {
    const { done } = this.state;
    this.updateList({ filter, done });
  }

  filterWithDone = done => e => {
    const { filter } = this.state;
    this.updateList({ filter, done });
  }

  sortItems = ({oldIndex, newIndex}) => {
    const diff =  newIndex - oldIndex;
    this.service
      .wtfReorder(this.items, this.state.items[oldIndex], this.state.items[newIndex], diff);
    this.service.reorder();

    this.updateList();
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
