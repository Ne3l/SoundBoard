import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Board.css';
import Scales from './scale/Scale';

const mapStateToProps = (state, props) => {
    return {
        play: state.play,
        time: state.time,
        zoom: state.zoom
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeZoom(zoom) {
            dispatch({ type: 'CHANGE_ZOOM', zoom });
        }
    };
};

class Board extends Component {
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
            <div className="board" onWheel={this.handleWheel}>
                <Scales />
                <div
                    style={{ left: 30 + this.props.time * this.props.zoom }}
                    className="tempoLine"
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
