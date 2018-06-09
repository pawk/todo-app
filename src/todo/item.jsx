import React from 'react';
import PropTypes from 'prop-types';

import * as style from './item.css';

export const TodoItem = ({ done, order, handleDelete, handleSelection, children }) => (console.log(order),
  <section className="todo__item">
    <div>
      <input 
        type="checkbox"
        id="item{order}"
        onChange={handleSelection} />
    </div>
    <div><label htmlFor="item{order}">{children}</label></div>
    <div>
      <button 
        className="todo__item-delete-btn"
        onClick={handleDelete}
        >
        - Delete
      </button>
    </div>
  </section>
);

TodoItem.propTypes = {
  done: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  done: false
}
