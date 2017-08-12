import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Scale.css';

import Key from './key/Key.js';
import Notes from './notes/Notes';

const SCALES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const PITCH = [2, 3, 4, 5, 6, 7];

const NOTES = Array.prototype.concat(...SCALES.map(scale => PITCH.map(pitch => scale + pitch)));

const mapStateToProps = (state, props) => {
    return {
        zoom: state.zoom,
        notes: state.notes
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeZoom(zoom) {
            dispatch({ type: 'CHANGE_ZOOM', zoom });
        },
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

    handleWheel = e => {
        let zoom = this.props.zoom;
        if (e.deltaY < 0) {
            zoom = zoom + 1;
        } else {
            zoom = zoom - 1;
        }
        e.preventDefault();
        e.stopPropagation();
        this.props.changeZoom(Math.max(1, zoom));
    };

    render() {
        return (
            <div className="scales" onWheel={this.handleWheel}>
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
