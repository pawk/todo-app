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
    const items = this.getItems();
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

  getItems({ filter, done } = this.state) {
    return this.service.getAll({ filter, done });
  }

  selectItem = item => e => {
    this.service.toggle(item);
    this.setState({ items: this.getItems() });
  }

  addItem = item => {
    this.service.add(item);
    this.setState({ items: this.getItems() });
  };

  updateItem = item => content => {
    let found = this.state.items.find(el => el === item);
    found.content = content;
    this.service.update(item, content);
    this.setState({ items: this.getItems() });
  }

  removeItem = item => e => {
    this.service.delete(item);
    this.setState({ items: this.getItems() });
  }

  filterItems = filter => {
    const { done } = this.state;
    this.setState({ 
      filter, 
      items: this.getItems({ filter, done })
    });    
  }

  filterWithDone = done => e => {
    const { filter } = this.state;
    this.setState({
      done,
      items: this.getItems({ filter, done })
    });
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
