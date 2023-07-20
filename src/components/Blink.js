import React, { Component } from "react";
import { Text } from "react-native";

export default class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isShowingText: true
        };

        setInterval(() => {
        this.setState(prevState => {
            return {
            isShowingText: !prevState.isShowingText
            };
        });
        }, 500);
    }

    render() {
        let display = this.state.isShowingText ? this.props.text : " ";
        return (
        <Text>{display}</Text>
        )
    }
}