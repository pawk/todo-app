import React from 'react';

import './filter.css';

const handleKeyUp = fn => e => {
  if (e.keycode === 27 || e.which === 27) {
    e.target.value = '';
  }
  fn(e.target.value);
};

const filterAll = e => { console.log('filter all'); }
const filterDone = e => { console.log('filter done'); }
const filterPending = e => { console.log('filter pending'); }

export default function TodoFilter({ onFilter }) {
  return (
    <section>
      <button onClick={filterAll}>All</button>
      <button onClick={filterDone}>Done</button>
      <button onClick={filterPending}>Pending</button>
      <input type="text"
        className="todo__filter-input"
        onKeyUp={handleKeyUp(onFilter)}
        placeholder="Filter" />
    </section>
  );
}
