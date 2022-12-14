import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TouchableNativeFeedbackBase } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polygon, Rect } from 'react-native-svg';

import { Reaction } from './reactions';

class BaseSoundReal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLyrics: false,
      isPlaying: false
    }
  }

  toggleLyrics() {
    const { showLyrics } = this.state;

    this.setState({ showLyrics: !showLyrics })
  }

  render() {
    return (
      <View style={{...(this.props.standalone ? styles.container : {})}}>
        <ImageBackground
          style={styles.coverImg}
          source={{
            uri: this.props.track.albumArt,
          }}
        >
          <View style={{
            padding: 8,
            flex: 0,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 10
          }}>
            <TouchableOpacity style={{padding: 8}} onPress={this.toggleLyrics.bind(this)}>
              <View style={styles.lyricsBtn.bg}>
                <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                  <Path d="M15.002 12.9a5 5 0 1 0 -3.902 -3.9" />
                  <Path d="M15.002 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
                </Svg>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{padding: 8}} onPress={() => { this.props.playPreview(this) }}>
              <View style={styles.lyricsBtn.bg}>
                { !(this.props.previewState.playing && this.props.previewState.id == this.props.id) && 
                  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Polygon points="5 3 19 12 5 21 5 3" />
                  </Svg>
                }
                { (this.props.previewState.playing && this.props.previewState.id == this.props.id) && 
                  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Rect x="6" y="4" width="4" height="16" /><Rect x="14" y="4" width="4" height="16" />
                  </Svg>
                }
              </View>
            </TouchableOpacity>
          </View>

          { this.state.showLyrics && <>
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
              padding: 20,
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}>
              <Text style={styles.lyrics.small}>{this.props.lyrics[0]}</Text>
              <Text style={styles.lyrics.large}>{this.props.lyrics[1]}</Text>
              <Text style={styles.lyrics.small}>{this.props.lyrics[2]}</Text>
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
          </>
          }
        </ImageBackground>

        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.trackName}>{this.props.track.title}</Text>
            <Text style={styles.trackArtistAlbum}>{this.props.track.artist} ??? {this.props.track.album}</Text>
          </View>

          { this.props.reaction && <Reaction
            content={this.props.reaction}
          /> }
        </View>
      </View>
    )
  }
}

class SoundReal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLyrics: false,
      isPlaying: false
    }
  }

  toggleLyrics() {
    const { showLyrics } = this.state;

    this.setState({ showLyrics: !showLyrics })
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

        <BaseSoundReal {...props} />

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

    marginBottom: 12
  },

  lyricsBtn: {
    bg: {
      height: 36,
      width: 36,
      fontSize: 18,
      borderRadius: 1000,
      backgroundColor: '#FFFFFF40',

      alignItems: 'center',
      justifyContent: 'center'
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
    color: '#B5B5B5',
    fontWeight: 'light',
    fontSize: 16,
    lineHeight: 20
  },

  caption: {
    color: '#FFFFFF80',
    fontWeight: 'light',
    fontSize: 12,
    lineHeight: 20,

    marginTop: 14
  }
})

module.exports = {
  BaseSoundReal,
  SoundReal
}