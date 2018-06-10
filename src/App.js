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
