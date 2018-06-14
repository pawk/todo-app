import React from 'react';
import PropTypes from 'prop-types';

import './item.css';

export const TodoItem = ({ item, onSelect, onUpdate, onDelete }) => {
  const { done, content } = item;
  const className = done ? 'todo__item todo__item--done' : 'todo__item';

  const handleBlur = e => onUpdate(e.target.value);
  const handleKeyDown = e => {
    if (e.keyCode === 13 || e.which === 13) {
      onUpdate(e.target.value);
      e.target.blur();
    }
  };

  return (
    <div className={className}>
      <label htmlFor={item.id}></label>      
      <div className="todo__item-content">
        <input
          id={item.id}
          type="checkbox"
          onChange={onSelect}
          checked={done ? true : false} />
        {!done ? <input
          type="text"
          defaultValue={content}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown} /> : content}
      </div>
      <div>
        <button
          className="todo__item-delete-btn"
          onClick={onDelete}
          >⌫</button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  done: PropTypes.bool,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  children: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  done: false,
  onSelect: () => {},
  onEdit: () => {},
  onDelete: () => {}
}
