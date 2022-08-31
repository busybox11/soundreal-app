import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';

export class BaseMusicSource extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const addedStyle = this.props.style;
    const addedStyleTitle = this.props.styleTitle;

    return (
      <TouchableOpacity style={{...styles.baseMusicSource, ...addedStyle}} onPress={this.props.handleAction}>
        <Text style={{...styles.sourceName, ...addedStyleTitle}}>{this.props.sourceName || "Music source"}</Text>

        {this.props.sourceIcon(styles.sourceIcon)}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  baseMusicSource: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 14,
    position: 'relative',
    height: 84
  },

  sourceName: {
    fontWeight: 'bold',
    fontSize: 24
  },

  sourceIcon: {
    position: 'absolute',
    right: 20,
    bottom: -20,
    color: '#00000050',
    height: 80,
    width: 80
  }
})