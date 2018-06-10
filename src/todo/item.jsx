import React from 'react';
import PropTypes from 'prop-types';

import './item.css';

export const TodoItem = (props) => {
  const { item, onSelect, onDelete, children } = props;
  const { done } = item;
  const className = done && 'todo__item--done' || 'todo__item';


  return (
    <section className={className}>
      <div>
        <input
          type="checkbox"
          id="item{order}"
          onChange={onSelect}
          checked={done} />
      </div>
      <div className="todo__item-content">
        <label htmlFor="item{order}">{children}</label>
      </div>
      <div>
        <button
          className="todo__item-delete-btn"
          onClick={onDelete}
          > - Delete</button>
      </div>
    </section>
  );
};

TodoItem.propTypes = {
  done: PropTypes.bool,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  children: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  done: false,
  onSelect: () => {},
  onDelete: () => {}
}
