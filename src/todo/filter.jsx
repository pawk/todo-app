import React from 'react';

import './filter.css';

const handleKeyUp = fn => e => {
  if (e.keycode === 27 || e.which === 27) {
    e.target.value = '';
  }
  fn(e.target.value);
};

export default function TodoFilter({ 
  onFilter,
  onAll,
  onDone,
  onPending
}) {
  return (
    <section>
      <button onClick={onAll}>All</button>
      <button onClick={onDone}>Done</button>
      <button onClick={onPending}>Pending</button>
      <input type="text"
        className="todo__filter-input"
        onKeyUp={handleKeyUp(onFilter)}
        placeholder="Filter" />
    </section>
  );
}
