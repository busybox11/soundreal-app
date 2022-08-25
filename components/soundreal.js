import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Reaction } from './reactions';

class SoundReal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props

    return (
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: props.user.profilePicture,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={styles.username}>{props.user.username}</Text>
            <Text style={styles.datePublication}>Just now</Text>
          </View>
        </View>

        <Image
          style={styles.coverImg}
          source={{
            uri: props.track.albumArt,
          }}
        />

        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.trackName}>{props.track.title}</Text>
            <Text style={styles.trackArtistAlbum}>{props.track.artist} • {props.track.album}</Text>
          </View>

          { props.reaction && <Reaction
            content={props.reaction}
          /> }
        </View>

        <Text style={styles.caption}>{props.caption}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 0,

    borderBottomColor: '#474747',
    borderBottomWidth: 1,
  },

  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 1000,

    marginRight: 14
  },

  username: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22
  },

  datePublication: {
    color: '#AAA',
    fontWeight: 'light',
    fontSize: 16
  },

  coverImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1/1,

    marginBottom: 10
  },

  trackName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF'
  },

  trackArtistAlbum: {
    color: '#AAA',
    fontWeight: 'light',
    fontSize: 20
  },

  caption: {
    color: '#555',
    fontWeight: 'light',
    fontSize: 18,

    marginTop: 14
  }
})

module.exports = {
  SoundReal
}