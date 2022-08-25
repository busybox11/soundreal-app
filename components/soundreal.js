import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

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

        <ImageBackground
          style={styles.coverImg}
          source={{
            uri: props.track.albumArt,
          }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}
          />

          <View style={{
            padding: 16,
            flex: 0,
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <Text style={styles.lyricsBtn.bg}>
              <Svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-microphone-2" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                <Path d="M15.002 12.9a5 5 0 1 0 -3.902 -3.9" stroke="white"></Path>
                <Path d="M15.002 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" stroke="white"></Path>
              </Svg>
            </Text>
          </View>

          <View style={{
            padding: 20,
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}>
            <Text style={styles.lyrics.small}>{props.lyrics[0]}</Text>
            <Text style={styles.lyrics.large}>{props.lyrics[1]}</Text>
            <Text style={styles.lyrics.small}>{props.lyrics[2]}</Text>
          </View>

          <View>
            <View style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
              marginTop: 0,
              marginBottom: 10
            }}>
              <Text style={styles.timestamps}>2:23</Text>
              <Text style={styles.timestamps}>3:19</Text>
            </View>
            <View style={{flex: 0, height: 4, backgroundColor: '#FFFFFF33'}}>
              <View style={{flex: 0, height: 4, width: '62.5%', backgroundColor: '#FFFFFF'}} />
            </View>
          </View>
        </ImageBackground>

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
    height: 52,
    width: 52,
    borderRadius: 1000,

    marginRight: 14
  },

  username: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  datePublication: {
    color: '#AAA',
    fontWeight: 'light',
    fontSize: 12
  },

  coverImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1/1,

    marginBottom: 10
  },

  lyricsBtn: {
    bg: {
      height: 36,
      width: 36,
      fontSize: 18,
      borderRadius: 1000,
      backgroundColor: '#FFFFFF40',

      textAlign: 'center',
      textAlignVertical: 'center'
    }
  },

  lyrics: {
    small: {
      color: '#FFFFFFCC',
      fontSize: 16,
      lineHeight: 18,
      fontWeight: 'bold',

      marginBottom: 16
    },
    large: {
      color: '#FFFFFF',
      fontSize: 22,
      lineHeight: 22,
      fontWeight: 'bold',

      marginBottom: 16
    }
  }, 

  timestamps: {
    fontSize: 12,
    color: "#FFF"
  },

  trackName: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#FFF'
  },

  trackArtistAlbum: {
    color: '#AAA',
    fontWeight: 'light',
    fontSize: 16,
    lineHeight: 20
  },

  caption: {
    color: '#555',
    fontWeight: 'light',
    fontSize: 12,
    lineHeight: 20,

    marginTop: 14
  }
})

module.exports = {
  SoundReal
}