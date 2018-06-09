import React from 'react';
import PropTypes from 'prop-types';

export default class TodoList extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  componentWillMount() {
    this.items = this.props.children;
  }
  
  render() {
    return this.items.map((item, key) => React.cloneElement(item, {
      key
    }))

  }
}