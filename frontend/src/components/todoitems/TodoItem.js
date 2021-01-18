import React from 'react';
import './TodoItem.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoitem: this.props.todo_item
        };
    }

    /**
     * This function sets true and todoitem object 
     * to showDetails in App.js to display other details 
     * of todo item.
     */
    todoDetails(evnt) {
        this.props.showDetails(true, this.state.todoitem);
    }

    /**
     * Marking todo as complete onclick of button
     * and resetting complete button to Undo
     */
    completeTodo(evnt) {
        let todoitem = this.state.todoitem;
        todoitem.completed = !todoitem.completed;

        this.setState({
            todoitem
        })
        this.props.editTodoPut(this.state.todoitem);

    }

    /**
     * Deletes todo item and removes div
     */
    deleteTodo(evnt) {
        evnt.target.parentNode.remove();
        this.props.deleteTodo(this.state.todoitem);
    }


    render() {
        let todoComplete = this.state.todoitem.completed ? "todo_complete" : "todo_incomplete";
        return (
            <div className="todo-item" id={this.state.todoitem.title}>
                <p className={todoComplete} onClick={this.todoDetails.bind(this)}>{this.state.todoitem.title}</p>
                <button className="complete-btn" onClick={this.completeTodo.bind(this)}>
                    {this.state.todoitem.completed ? "Undo" : "Complete"}</button>
                <button className="delete-btn" onClick={this.deleteTodo.bind(this)}>Delete</button>
            </div>
        )
    }
}