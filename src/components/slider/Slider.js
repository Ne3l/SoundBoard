import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
    state = {
        clicked: false
    };

    onMouseMove = e => {
        if (this.state.clicked) {
            console.log('hola', this.state, e.clientX, e.pageX, e.screenX);
            console.log(document.elementFromPoint(e.clientX, e.clientY));
        }
    };

    render() {
        return (
            <div className="slider" onMouseMove={this.onMouseMove}>
                <div
                    className="ball"
                    onMouseDown={e => this.setState({ clicked: true })}
                    onMouseUp={e => this.setState({ clicked: false })}
                    onMouseLeave={e => this.setState({ clicked: false })}
                />
            </div>
        );
    }
}

export default Slider;
