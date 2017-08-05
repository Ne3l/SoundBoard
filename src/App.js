import React, { Component } from 'react';
import './App.css';

import Board from './components/board/Board.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Piano</h2>
                </div>
                <Board />
            </div>
        );
    }
}

export default App;
