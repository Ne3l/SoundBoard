import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Board from './components/board/Board.js';

const mapStateToProps = (state, props) => {
    return {
        play: state.play,
        time: state.time,
        notes: state.notes
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglePlay() {
            dispatch({ type: 'TOGGLE_PLAY' });
        }
    };
};

class App extends Component {
    formatTime() {
        return new Date(this.props.time * 1000).toUTCString().split(' ')[4];
    }

    playSound() {}

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>
                        Volume: {this.props.volume}
                    </h2>
                    <h2>
                        Time : {this.formatTime()}
                    </h2>
                    <button onClick={this.props.togglePlay}>
                        {this.props.play ? 'Pause' : 'Play'}
                    </button>
                </div>
                <Board />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
