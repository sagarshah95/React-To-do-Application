import React from 'react';
import './TodoDetails.scss';
import NewTodo from '../new-todo/NewTodo'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /** setting initial value of edit to false */
            edit: false,
            /** set to true to show NewTodo component */
            showTodo: true
        };
    }
    // componentWillMount(){
    //     console.log("mount");
    //     if(this.props.showDetails){
    //         this.setState({
    //             showTodo: true
    //           })
    //     }
    // }

    /**
     * sets edit state to true on click of edit button
     */
    editTodo(evnt) {
        evnt.preventDefault();
        this.setState({
            edit: true
        });
    }

    // closeTodoDiv(show){
    //     this.setState({
    //       showTodo: show
    //     })
    //   }

    /** When clicked on edit NewTodo component will be rendered else
     * shows only details of todo item with edit button to update
    */
    showDetails() {
        if (!this.state.edit) {
            return (
                <div className="todo-item">
                    <h3>Selected Todo item details</h3>
                    <p>Title: {this.props.details.title}</p>
                    <p>Description: {this.props.details.description}</p>
                    <p>Due Date: {this.props.details.dueDate}</p>
                    <p>Time: {this.props.details.dueTime}</p>
                    <button className="edit-btn" onClick={this.editTodo.bind(this)}>Edit</button>

                </div>
            )
        } else {

            return (

                <div>
                    {this.state.showTodo &&
                        <NewTodo add={this.props.add} edittodo={this.props.details}
                            editTodoPut={this.props.editTodoPut} edit={true}
                            close={this.props.resetEdit} />
                    }
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.showDetails()}
            </div>
        )
    }
}