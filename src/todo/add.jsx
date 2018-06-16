import React from 'react';
import PropTypes from 'prop-types';

import './add.css';

// TODO this should be default export
export const TodoAdd = ({ onAdd }) => {
  const handleAdd = e => {
    const content = e.target.value;
    if (content) {
      onAdd({ content });
      e.target.value = '';
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleAdd(e);
    }
  }

  return (
    <section className="todo__add">
      <input className="todo__add-input"onKeyUp={handleKeyUp} placeholder="Enter new item" />
    </section>
  );
};

TodoAdd.propTypes = {
  onAdd: PropTypes.func.isRequired
}
