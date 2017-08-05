import React, { Component } from "react";
import "./Keys.css";

class Keys extends Component {
    getKeys() {
        return this.props.scales.map(scale => {
            return this.props.keys.map(key => {
                return (
                    <div key={key + scale} className="key">
                        {key + scale}
                    </div>
                );
            });
        });
    }

    render() {
        return (
            <div className="keys">
                {this.getKeys()}
            </div>
        );
    }
}

export default Keys;
