import React, { Component } from 'react';
import './App.css';
import TodoTable from './TodoTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    const newTodo = {date: this.state.date, description: this.state.description};
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  delTodo = (event) => {
  event.preventDefault();
  const indexi = parseInt(event.target.id, 10);
  const newList = this.state.todos.filter((todo, i) => i !== indexi);
  this.setState({
    todos: newList
  });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit = {this.addTodo}>
            Description: <input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/>
            Date: <input type="text" name="date" onChange={this.inputChanged} value={this.state.date}/>
            <input type="submit" value="Add"/>
          </form>
        </div>

        <div>
          <TodoTable todos={this.state.todos} />
        </div>          
      </div>    
    );
  }
}

export default App;
