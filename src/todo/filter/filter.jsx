import React from 'react';

import './filter.css';

const handleKeyUp = fn => e => {
  if (e.keycode === 27 || e.which === 27) {
    e.target.value = '';
  }
  fn(e.target.value);
};

const ref = React.createRef();

export default function TodoFilter({
  value,
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

  const handleClear = () => {
    ref.current.value = '';
    onFilter('');
  }

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
      <li className="todo__filter-input">
        <input type="text"
          ref={ref}
          onKeyUp={handleKeyUp(onFilter)}
          placeholder="Filter"
        />
        {value && <button
          className="todo__filter-clear-button"
          onClick={handleClear}>✖</button>}
      </li>
    </ul>
  );
}
