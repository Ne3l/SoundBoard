import React, { Component } from 'react';
import './App.css';
import Board from './components/board/Board.js';
import SoundPlayer from './components/soundPlayer/SoundPlayer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <SoundPlayer />
                <Board />
            </div>
        );
    }
}

export default App;
