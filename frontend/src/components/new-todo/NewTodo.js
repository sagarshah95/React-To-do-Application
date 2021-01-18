import React from 'react';
import './NewTodo.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /** holds todo item details on click of edit */
            todoitem: this.props.edittodo,
            /** stores error messages based on text field validations*/
            errors: {},
            /** sets to true when Edit is clicked */
            edit: this.props.edit
        };
    }

    componentDidMount() {
        if (this.state.edit) {
            let todoitem = this.state.todoitem;
            todoitem.dueTime = '';
            this.setState({
                todoitem
            })
        }
    }

    /**
     * Validates input fields and sets error messages.
     * @returns {boolean} formValid
     */
    validateFields() {
        let todoitem = this.state.todoitem;
        let errors = {};
        let formValid = true;

        if (!todoitem["title"]) {
            formValid = false;
            errors["title"] = "Cannot be empty";
        }
        if (!todoitem["description"]) {
            formValid = false;
            errors["desc"] = "Cannot be empty";
        }
        if (!todoitem["dueDate"]) {
            formValid = false;
            errors["dueDate"] = "Cannot be empty";
        }
        if (!todoitem["dueTime"]) {
            formValid = false;
            errors["dueTime"] = "Cannot be empty";
        }
        this.setState({
            errors: errors
        });
        return formValid;

    }

    /**
     * Called when clicked on save button when adding new todo item
     * or editing existing one.
     * @param {Object} evnt 
     */
    saveTodo(evnt) {

        evnt.preventDefault();

        if (this.validateFields()) {
            // Converting input time to DateTime
            let todoitem = this.state.todoitem;
            todoitem["dueTime"] = new Date(
                this.state.todoitem.dueDate.slice(0, 10).split('-').join('/')
                + " " + todoitem["dueTime"]);
            this.setState({
                todoitem
            })
            if (this.state.edit) {
                this.props.editTodoPut(this.state.todoitem);
            } else {
                this.props.add(this.state.todoitem);
            }
        } else {
            alert("Form has errors");
        }
    }

    /**
     * Called everytime when there is change in input fields
     * and updated todoitem state
     */
    update(evnt) {
        evnt.preventDefault();
        let todoitem = this.state.todoitem;
        let field = evnt.target.name;
        todoitem[field] = evnt.target.value;
        this.setState({
            todoitem
        });
    }

    /**
     * on click of close button cloases NewTodo div
     */
    closeTodoDiv() {
        // Setting close property to false when clicked on edit
        if (this.state.edit) {
            this.props.close(false);
            return;
        }
        this.props.close(false);
    }

    render() {
        let date = this.state.todoitem.dueDate; // variable to set date value
        /** Pre populating todo details when clicked on edit
         *  adjusting date and time formats
         * */
        if (this.state.edit) {

            if (Object.keys(this.state.todoitem.dueDate).length !== 0) {
                date = this.state.todoitem.dueDate.slice(0, 10);
            }
        }

        return (

            <div className="new-todo-item">

                <div className="field-set">
                    <label>Title: </label>
                    <input type="text" onChange={this.update.bind(this)} name="title"
                        value={this.state.todoitem.title}></input><br /><br />
                    <span className="errormsg">{this.state.errors["title"]}</span>
                    <br /><br />

                    <label>Description: </label>
                    <input type="text" onChange={this.update.bind(this)} name="description"
                        value={this.state.todoitem.description}></input><br /><br />
                    <span className="errormsg">{this.state.errors["desc"]}</span>
                    <br /><br />

                    <label>Due Date: </label>
                    <input type="date" onChange={this.update.bind(this)} name="dueDate"
                        value={date}></input><br /><br />
                    <span className="errormsg">{this.state.errors["dueDate"]}</span>
                    <br /><br />

                    <label>Time: </label>
                    <input type="time" onChange={this.update.bind(this)} name="dueTime"></input>
                    <br /><br />
                    <span className="errormsg">{this.state.errors["dueTime"]}</span>
                    <br /><br />

                    <button className="save-btn" onClick={this.saveTodo.bind(this)}>Save</button>
                    &nbsp;&nbsp;
                    <button className="close-btn" onClick={this.closeTodoDiv.bind(this)}>Close</button>
                </div>

            </div>
        )
    }
}