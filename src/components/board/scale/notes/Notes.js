import React, { Component } from 'react';
import './Notes.css';
import classNames from 'classnames';

const NUM = 60;

class Notes extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.zoom !== nextProps.zoom) return true;
        if (this.props.notes !== nextProps.notes) return true;
        return false;
    }
    render() {
        const width = 60 * this.props.zoom;
        return (
            <div className="notes">
                {[...new Array(NUM)].map((e, i) => {
                    return (
                        <div
                            key={i}
                            onClick={event => {
                                this.props.add(this.props.note, i);
                            }}
                            style={{ width }}
                            className={classNames('note', {
                                active: this.props.notes.some(note => note.sec === i)
                            })}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Notes;
