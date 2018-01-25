import React, { Component } from 'react';
import './App.css'

class TodoTable extends Component {
	constructor(props) {
		super(props);
	}



	render() {
		return(
			<div className="App">
	          <table>
	          <tbody>
	          <tr>
	            <td>Date</td><td>Description</td><td></td>
	          </tr>
	            {this.props.todos.map((item, index) => 
	              <tr key={index}>
	                <td>{item.date}</td>
	                <td>{item.description}</td>
	                <td><input id={index} type="submit" onClick={this.delTodo} value="Delete"/></td>
	              </tr>)}
	          </tbody>
	          </table>
			</div>
		);
	}
}
export default TodoTable;
