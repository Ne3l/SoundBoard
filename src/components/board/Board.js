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
    return {
        increaseTime() {
            dispatch({ type: 'INCREASE_TIME', time: 1.1 });
        }
    };
};

let raf;

class Board extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.play === false && nextProps.play) {
            raf = window.requestAnimationFrame(this.increaseTime);
        }

        if (this.props.play && nextProps.play === false) {
            window.cancelAnimationFrame(raf);
        }
    }

    increaseTime = () => {
        this.props.increaseTime();
        raf = window.requestAnimationFrame(this.increaseTime);
    };

    render() {
        return (
            <div className="board">
                <Scales />
                {this.props.play &&
                    <div style={{ left: 20 + this.props.time }} className="tempoLine" />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
