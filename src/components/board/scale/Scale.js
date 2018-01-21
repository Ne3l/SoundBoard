import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Scale.css';

import Key from './key/Key.js';
import Notes from './notes/Notes';
import teoria from 'teoria';

var a4 = teoria.note('a');

const SCALES = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];
const PITCH = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const NOTES = Array.prototype.concat(
    ...PITCH.map(pitch => {
        return SCALES.map(scale => scale + pitch);
    })
);

const mapStateToProps = (state, props) => {
    return {
        zoom: state.zoom,
        notes: state.notes
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addNote(scale, sec) {
            let type = this.notes.filter(e => e.sec === sec).length ? 'REMOVE_NOTE' : 'ADD_NOTE';
            let note = {
                scale,
                sec
            };
            dispatch({ type, note });
        }
    };
};

class Scale extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.zoom !== nextProps.zoom) return true;
        if (this.props.notes !== nextProps.notes) return true;
        return false;
    }

    render() {
        return (
            <div className="scales">
                {NOTES.map(note => {
                    return (
                        <div key={note} className="scale">
                            <Key note={note} />
                            <Notes
                                note={note}
                                notes={this.props.notes.filter(e => e.scale === note)}
                                add={this.props.addNote}
                                zoom={this.props.zoom}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scale);
