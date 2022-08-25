import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

class Reaction extends Component {    
    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props

        return (
            <Text style={styles.circleBg}>{props.content}</Text>
        )
    }
}

const styles = StyleSheet.create({
    circleBg: {
        height: 30,
        width: 30,
        fontSize: 18,
        borderRadius: 1000,
        backgroundColor: '#FFF',

        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

module.exports = {
    Reaction
}