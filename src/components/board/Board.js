import React, { Component } from 'react';
import './Board.css';

import Keys from './keys/Keys.js';
import Notes from './notes/Notes';

const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const SCALES = [3, 4, 5, 6, 7];

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1
        };
    }

    handleWheel = e => {
        let zoom = this.state.zoom;
        if (e.deltaY < 0) {
            zoom = zoom + 1;
        } else {
            zoom = zoom - 1;
        }
        e.preventDefault();
        e.stopPropagation();
        this.setState({ zoom: Math.max(1, zoom) });
    };

    render() {
        return (
            <div className="board" onWheel={this.handleWheel}>
                <Keys keys={KEYS} scales={SCALES} />
                <Notes keys={KEYS} scales={SCALES} zoom={this.state.zoom} />
            </div>
        );
    }
}

export default Board;
