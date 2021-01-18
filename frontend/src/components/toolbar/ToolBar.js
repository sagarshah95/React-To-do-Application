import React from 'react';
import './ToolBar.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * Sets addtodo props to true on click of add button
     */
    addTodo(evt) {
        evt.preventDefault();
        this.props.add(true);
    }

    render() {
        return (
            <div className="toolbar">
                <button className="add-btn" onClick={this.addTodo.bind(this)}>Add</button>
            </div>
        )
    }
}