import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SoundPlayer.css';
// import teoria from 'teoria';

const mapStateToProps = (state, props) => {
    let timeInSecs = Math.floor(state.time / 60);
    return {
        play: state.play,
        time: state.time,
        volume: state.volume,
        note: state.notes.find(e => e.sec === timeInSecs)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglePlay() {
            dispatch({ type: 'TOGGLE_PLAY' });
        },
        increaseTime() {
            dispatch({ type: 'INCREASE_TIME', time: 1 });
        }
    };
};

const context = new AudioContext();
const oscilator = context.createOscillator();
oscilator.start(0);

const gain = context.createGain();
gain.gain.value = 0;

oscilator.connect(gain);
gain.connect(context.destination);

// console.log(teoria.note('C4'));

class SoundPlayer extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.play === false && nextProps.play) {
            this.raf = window.requestAnimationFrame(this.loop);
        }

        if (this.props.play && nextProps.play === false) {
            window.cancelAnimationFrame(this.raf);
            gain.gain.value = 0;
        }
    }

    loop = () => {
        this.props.increaseTime();
        this.playNote();
        this.raf = window.requestAnimationFrame(this.loop);
    };

    getFrequency(scale) {
        console.log(this.props.note, scale);

        const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
        let note = this.props.note.scale;
        let octave;
        let keyNumber;

        if (note.length === 3) {
            octave = note.charAt(2);
        } else {
            octave = note.charAt(1);
        }

        keyNumber = notes.indexOf(note.slice(0, -1));

        if (keyNumber < 3) {
            keyNumber = keyNumber + 12 + (octave - 1) * 12 + 1;
        } else {
            keyNumber = keyNumber + (octave - 1) * 12 + 1;
        }

        // Return frequency of note
        console.log(440 * Math.pow(2, (keyNumber - 49) / 12));
        return 440 * Math.pow(2, (keyNumber - 49) / 12);
    }

    playNote() {
        if (this.props.note) {
            gain.gain.value = 1;
            oscilator.frequency.value = this.getFrequency(this.props.note.scale);
        } else {
            gain.gain.value = 0;
            oscilator.frequency.value = 0;
        }
    }

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
