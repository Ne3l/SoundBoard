import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Board.css';
import Scales from './scale/Scale';

const mapStateToProps = (state, props) => {
    return {
        play: state.play,
        time: state.time
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
                {this.props.play &&
                    <div style={{ left: 30 + this.props.time }} className="tempoLine" />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
