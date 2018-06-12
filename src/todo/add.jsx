import React from 'react';
import PropTypes from 'prop-types';

import './add.css';

export const TodoAdd = ({ onAdd }) => {
  const ref = React.createRef();

  const handleAdd = () => {
    const content = ref.current.value;
    if (content) {
      onAdd({ content });
      ref.current.value = '';
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleAdd();
    }
  }

  return (
    <section className="todo__add">
      <input className="todo__add-input" ref={ref} onKeyUp={handleKeyUp} placeholder="Enter new item" />
      <button class="todo__add-btn" onClick={handleAdd}>+</button>
    </section>
  );
};

TodoAdd.propTypes = {
  onAdd: PropTypes.func.isRequired
}
