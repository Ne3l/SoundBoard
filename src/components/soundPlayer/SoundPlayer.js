import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SoundPlayer.css';

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
        },
        increaseTime() {
            dispatch({ type: 'INCREASE_TIME', time: 1.1 });
        }
    };
};

class SoundPlayer extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.play === false && nextProps.play) {
            this.raf = window.requestAnimationFrame(this.increaseTime);
        }

        if (this.props.play && nextProps.play === false) {
            window.cancelAnimationFrame(this.raf);
        }
    }

    increaseTime = () => {
        this.props.increaseTime();
        this.raf = window.requestAnimationFrame(this.increaseTime);
    };

    formatTime() {
        return new Date(this.props.time * 1000).toUTCString().split(' ')[4];
    }
    render() {
        return (
            <div className="SoundPlayer">
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);
