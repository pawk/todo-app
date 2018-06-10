import React from 'react';
import PropTypes from 'prop-types';

import './item.css';

function slugify(str) {
  return str.replace(/[^A-Za-z0-9]/g, '')
}

export const TodoItem = (props) => {
  const { item, onSelect, onDelete, children: content } = props;
  const { done } = item;
  const className = done ? 'todo__item--done' : 'todo__item';
  const id = "item".concat(slugify(content));

  return (
    <section className={className}>
      <div>
        <input
          type="checkbox"
          id={id}
          onChange={onSelect}
          checked={done ? true : false} />
      </div>
      <div className="todo__item-content">
        <label htmlFor={id}>{content}</label>
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
