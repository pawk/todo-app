import React from 'react';
import logo from './logo.svg';
import './App.css';

import TodoList from './todo';
import { TodoItem } from './todo';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoList>
          <TodoItem>jeden</TodoItem>
          <TodoItem>dwa</TodoItem>
        </TodoList>
      </div>
    );
  }
}

export default App;
