import React from 'react';
import './app.css';

import TodoList, { TodoItem } from './todo';

class App extends React.Component {
  render() {
    return (
      <div className="todo-app">
        <TodoList>
          <TodoItem done>buy some milk</TodoItem>
          <TodoItem>evening ballet classes</TodoItem>
        </TodoList>
      </div>
    );
  }
}

export default App;
