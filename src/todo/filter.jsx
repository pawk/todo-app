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
  const filters = [
    {
      label: 'All',
      handler: onAll,
      checked: true
    },
    {
      label: 'Pending',
      handler: onPending
    },
    {
      label: 'Done',
      handler: onDone
    }
  ];
  
  return (
    <ul className="todo__filter">
      {filters.map(({ label, handler, checked }, key) => (
        <li key={key}>
          <input 
            type="radio" 
            name="doneFilter" 
            id={label} 
            onClick={handler}
            defaultChecked={checked} />
          <label htmlFor={label}>{label}</label>
        </li>
      ))}
      <li>
        <input type="text"
          className="todo__filter-input"
          onKeyUp={handleKeyUp(onFilter)}
          placeholder="Filter" />
      </li>
    </ul>
  );
}
