import React from 'react';
import PropTypes from 'prop-types';

import './add.css';

export const TodoAdd = ({ onAdd }) => {
  const inputRef = React.createRef();

  const handleAdd = () => {
    const content = inputRef.current.value;
    if (content) {
      onAdd({ content });
      inputRef.current.value = '';
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleAdd();
    }
  }

  return (
    <section className="todo__add">
      <input className="todo__add-input" ref={inputRef} onKeyUp={handleKeyUp} placeholder="Next thing to do is ..." />
      <button className="todo__add-btn" onClick={handleAdd}>+</button>
    </section>
  );
};

TodoAdd.propTypes = {
  onAdd: PropTypes.func.isRequired
}
