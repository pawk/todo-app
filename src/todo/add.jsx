import React from 'react';

import './add.css';

export const TodoAdd = () => (
  <section className="todo__add">
    <input className="todo__add-input" name="content" />
    <button className="todo__add-btn">+</button>
  </section>
);
