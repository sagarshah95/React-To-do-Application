import React from 'react';
import './App.scss';
import NavBar from './nav-bar/Navbar';
import Toolbar from './toolbar/ToolBar';
import NewTodo from './new-todo/NewTodo';
import TodoList from './todolist/TodoList';
import TodoDetails from './tododetails/TodoDetails';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** Page title*/
      title: 'TODO App',
      /**list to display on page load */
      todolist: [],
      /**error message shown when there is problem in loading page. */
      errorMessage: '',
      /**sets to true when user clicks on Add button and displays NewTodo page */
      showAddTodo: false,
      /**sets to true when user clicks on existing todo to display details. */
      showDetails: false,
      /**has all details of a todo item which are retrieved when clicked on todo div. */
      todoDetails: '',
      /** sets to true if todo is marked as complete */
      completeTodo: false

    };
  }

  /**
   * GET request made to the server to retrieve existing todo list.
   */
  componentDidMount() {

    fetch('http://localhost:5000/todos')
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        // adding retrieved data to todolist
        this.setState({
          todolist: data
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        });
        alert('Error in loading page!', error);
      });

  }
  /**
   * This function sets showAddTodo to true when clicked on Add button
   * @param {boolean} show
   * */
  showAddTodo(show) {
    this.setState({
      showAddTodo: show
    })
  }

  /**
   * This function makes a POST request and adds new todo item to database.
   * @param {Object} newtodo
   * 
   * */
  addTodo(newtodo) {
    //json data sent in body of the request
    let data = {
      title: newtodo.title,
      description: newtodo.description,
      dueDate: newtodo.dueDate,
      dueTime: newtodo.dueTime,
      completed: false
    }

    fetch('http://localhost:5000/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        alert("Successfully added todo item ");
        window.location.reload();
      })
      .catch(error => alert('Error posting data: ', error));
  }


  /**
   * This function sets showDetails to true and adds todo object details
   * which is used to display details using TodoDetails component
   * @param {boolean} show
   * @param {Object} todoDetails
  */
  showDetails(show, todoDetails) {
    this.setState({
      showDetails: show,
      todoDetails: todoDetails
    })
  }

  /**
   *when todo details are shown, on click of edit and saving new data, 
   * PUT request is made to update the object.
   * @param {Object} todo
   */
  editTodoPut(todo) {
    //updated json sent in request body
    let data = {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      dueTime: todo.dueTime,
      completed: todo.completed
    }

    fetch('http://localhost:5000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        alert("Successfully Updated todo item: ", data);
        window.location.reload();
      })
      .catch(error => alert('Error updating data: ', error));
  }

  /**
   * On click of delete button, DELETE request is made to remove 
   * todo item from existing list
   * @param {Object} todo
   */
  deleteTodo(todo) {
    let requestHeaders = {
      method: 'DELETE'
    };
    fetch('http://localhost:5000/todos/' + todo.id, requestHeaders)
      .then(response => response.text())
      .then(res => {
        alert("Deleted Successfully ", res);
        window.location.reload();
      })
      .catch(error => alert("Cannot delete todo item ", error));
  }

  /**
   * This function closes NewTodo div on click of close button
   * @param {boolean} show
   */
  closeTodoDiv(show) {
    this.setState({
      showAddTodo: show
    })
  }

  /**
   * Resetting showDetails on click of close button.
   * This helps to show TododDetails component on click of todo item again.
   * @param {boolean} reset 
   */
  resetEdit(reset) {
    this.setState({
      showDetails: reset,
      todoDetails: {}
    })
  }

  render() {
    const obj = {};
    return (
      <div>
        {/* NavBar component to display Page navigation bar*/}
        <NavBar title={this.state.title} />

        {/* Component to show add button */}
        <Toolbar add={this.showAddTodo.bind(this)} />

        {/**  NewTodo component is shown only when clicked on ADD button 
         * props : 
         *    add - holds addTodo function which adds new todo to database.
         *    edit - set to false since new todo item is being added and not edited
         *    edittodo - sends an empty object as a new todo is created.
         *    close - holds closTodoDiv function to close the div.
        */}
        {this.state.showAddTodo &&
          <NewTodo add={this.addTodo.bind(this)} edit={false} edittodo={obj}
            close={this.closeTodoDiv.bind(this)} />
        }

        {/**component to display list of Todo items retrieved from GET request 
         * props:
         *    todolist - list of retrieved todoitems from GET request.
         *    showDetails - holds showdetails fucntion which which is used to display todo details.
         *    deleteTodo - holds deleteTodo function which sends DELETE request
        */}
        <TodoList todolist={this.state.todolist} showDetails={this.showDetails.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
          editTodoPut={this.editTodoPut.bind(this)} />

        {/** TodoDetails component is shown only when user clicks on todo item title 
         * props:
         *  details - holds details of todo item when clicked on todo in UI.
         *  editTodoPut - holds function to send PUT request which updates todo item.
         *  add - holds addTodo function which adds new todo to database. This is sent to NewTodo component.
         *  resetEdit - holds resetEdit function.
        */}
        {
          this.state.showDetails &&
          <TodoDetails details={this.state.todoDetails} editTodoPut={this.editTodoPut.bind(this)}
            add={this.addTodo.bind(this)} resetEdit={this.resetEdit.bind(this)} />
        }
      </div>
    );
  }
}
