import React from 'react';
import './TodoList.scss';
import TodoItem from './../todoitems/TodoItem';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * Sets showDetails props with given parameters
     * @param {boolean} show 
     * @param {Object} todo 
     */
    showDetails(show, todo) {
        this.props.showDetails(show, todo);
    }

    /**
     * sets deleteTodo props with selected todo item to delete.
     * @param {Object} todo 
     */
    deleteTodo(todo) {
        this.props.deleteTodo(todo);
    }

    render() {
        let count = 0;
        let todoList = this.props.todolist.map(c => {
            count++;
            return <TodoItem key={count} todo_item={c} showDetails={this.showDetails.bind(this)}
                deleteTodo={this.deleteTodo.bind(this)}
                editTodoPut={this.props.editTodoPut} />
        });
        return (
            <div className="todo-list">{todoList}</div>
        )
    }
}