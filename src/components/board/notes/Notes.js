import React, { Component } from 'react';
import './Notes.css';

const NUM = 50;

const Note = ({ zoom }) => {
    return (
        <div className="note-row">
            {[...new Array(NUM)].map((e, i) => {
                return <div key={i} style={{ width: 15 * zoom + 'px' }} className="note" />;
            })}
        </div>
    );
};

class Notes extends Component {
    getNotes() {
        const { scales, keys } = this.props;
        return scales.map(scale =>
            keys.map(key => <Note key={key + scale} zoom={this.props.zoom} />)
        );
    }

    render() {
        return (
            <div className="notes">
                {this.getNotes()}
            </div>
        );
    }
}

export default Notes;
