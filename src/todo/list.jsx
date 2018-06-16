import React from 'react';
import PropTypes from 'prop-types';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { TodoItem } from './item';
import { TodoAdd } from './add';
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

  onSortEnd = ({oldIndex, newIndex}) => {
    const items = this.service
      .reorder(arrayMove(this.state.items, oldIndex, newIndex));
      console.log(this.service.items)
    this.updateState();
  };

  renderList() {
    const SortableItem = SortableElement(({item}) =>
      <li key={item.id}>
        <TodoItem
          key={item.id}
          item={item}
          onSelect={this.selectItem(item)}
          onDelete={this.removeItem(item)}
          onUpdate={this.updateItem(item)}
        >{item.content}</TodoItem>
      </li>
    );

    const SortableList = SortableContainer(({items}) => {
      return (
        <ul className="todo__list-items">
          {this.state.items.map((item, key) =>
            <SortableItem key={`item-${key}`} index={key} item={item} />
          )}
        </ul>
      );
    });

    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
  }

  render() {
    return (
      <section className="todo__list">
        <TodoAdd onAdd={this.addItem}></TodoAdd>
        {this.renderList()}
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
