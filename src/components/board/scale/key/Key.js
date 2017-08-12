import React, { Component } from 'react';
import './Key.css';

class Key extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div className="key">
                {this.props.note}
            </div>
        );
    }
}

export default Key;
