import React from 'react';
import './App.css';

import TodoList, { TodoItem } from './todo';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoList>
          <TodoItem done>jeden</TodoItem>
          <TodoItem>siedem</TodoItem>
          <TodoItem>piec</TodoItem>
          <TodoItem done>osiem</TodoItem>
          <TodoItem>dwa</TodoItem>
        </TodoList>
      </div>
    );
  }
}

export default App;
