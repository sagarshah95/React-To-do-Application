import React from 'react';
import './Navbar.scss';

export default class extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    //Displays Page title
    render() {
        return (
        <nav className="nav-bar">{this.props.title}</nav>
        )
    }
}