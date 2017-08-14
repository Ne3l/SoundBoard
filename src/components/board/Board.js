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
    return {};
};

class Board extends Component {
    render() {
        return (
            <div className="board">
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
