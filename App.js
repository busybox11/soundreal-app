import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar as ReactStatusBar } from 'react-native';

import { Audio } from 'expo-av';

import { SoundReal } from './components/soundreal';
import { Reaction } from './components/reactions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerElevation: 0,
      preview: {
        playing: false,
        id: undefined
      }
    };

    this.sound = new Audio.Sound();

    this.sound._onPlaybackStatusUpdate = async (playbackStatus) => {
      if (playbackStatus.didJustFinish == true) {
        this.setState({
          preview: {
            playing: false
          }
        })

        // TODO: Remove audio session because still active after this
        await this.sound.unloadAsync();
      }
    }
  }

  async playPreview(origin) {
    const { playing, id } = this.state.preview;
    let nowPlaying = playing

    if (origin.props.id == id || id == undefined) {
      nowPlaying = !playing
    }

    this.setState({ preview: {
      playing: nowPlaying,
      id: origin.props.id
    }})

    if (nowPlaying) {
      try {
        await this.sound.unloadAsync();
        await this.sound.loadAsync({ uri: origin.props.track.preview });
        await this.sound.playAsync();
      } catch (error) {
        console.error(error)
      }
    } else {
      await this.sound.unloadAsync();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          stickyHeaderIndices={[0]}
          onScroll={(event) => {
            const scrolledAmount = event.nativeEvent.contentOffset.y

            this.setState({headerElevation: (scrolledAmount > 16) ? 8 : 0})
          }}
        >
          <View style={{...styles.header, elevation: this.state.headerElevation}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{flex: 1}}>
                <Text style={styles.text.title}>SoundReal</Text>
                <Text style={styles.text.subtitle}>What are y'all listening to?</Text>
              </View>

              <Image
                style={styles.headerProfilePic}
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/29630035?s=160&v=4',
                }}
              />
            </View>
          </View>

          <View style={styles.headerReal.container}>
            <Image
              style={styles.headerReal.imgCover}
              source={{
                uri: 'https://i.scdn.co/image/ab67616d00001e02f798d46201c266747be5db2e',
              }}
            />
            <View style={styles.headerReal.trackInfo}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.headerReal.trackName}>Glimpse of Us</Text>
                  <Text style={styles.headerReal.trackArtistAlbum}>Joji • Glimpse of Us</Text>
                </View>

                <Reaction
                  content={"😭"}
                />
              </View>

              <View style={styles.separation} />
              <Text style={{color: '#FFF', fontWeight: 'light', fontSize: 12, marginTop: 6 }}>i am crying rn</Text>
            </View>
          </View>
          
          <SoundReal
            id={1}
            user={{
              username: 'pabloleplusbeau',
              profilePicture: 'https://cyber-privacy.net/wp-content/uploads/thispersondoesnotexist.com-image02-1024x1024.jpg'
            }}
            track={{
              title: 'Auburn',
              artist: 'Lomepal',
              album: 'Auburn',
              albumArt: 'https://i.scdn.co/image/ab67616d0000b273366ca0996e7229cc007dcbde',
              preview: 'https://p.scdn.co/mp3-preview/ef8ba48e811e2db65b96da505e6ef03b909e6588?cid=2afca98576b4421595a2802803d0b92a'
            }}
            playPreview={this.playPreview.bind(this)}
            previewState={this.state.preview}
            lyrics={[
              "Le mal est partout, comment faire attention ?",
              "J'aurais jamais assez vécu",
              "Pour savoir reconnaître une bonne intention"
            ]}
            caption={"incroyable cette musique"}
            reaction={'✨'}
          />
          <SoundReal
            id={2}
            user={{
              username: 'michaeeeeel',
              profilePicture: 'https://www.proresource.com/wp-content/uploads/2022/01/Jett-McCandless.jpeg'
            }}
            track={{
              title: 'Lezgongue',
              artist: 'ZZCCMXTP',
              album: 'ZZCCMXTP',
              albumArt: 'https://i.scdn.co/image/ab67616d0000b2739143f1836e8aa76d41dfac90',
              preview: 'https://p.scdn.co/mp3-preview/de57fbd1001f7789af6c5d47f68e38da57dc20fe?cid=2afca98576b4421595a2802803d0b92a'
            }}
            playPreview={this.playPreview.bind(this)}
            previewState={this.state.preview}
            lyrics={[
              "Et qauand on sort un skeud, y'a rarement d'défauts dessus",
              `ZZCC, crie "Lezgongue" dans la boîte (crie "Lezgongue" dans la boîte)`,
              "Si tu fais le suceur, on te récompensera pas"
            ]}
            caption={"c'est une dinguerie ce truc wow"}
          />
        </ScrollView>

        <StatusBar style="light" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    title: { color: '#FFF', fontWeight: 'bold', fontSize: 26, lineHeight: 30 },
    subtitle: {color: '#AAA', fontWeight: 'light', fontSize: 16, lineHeight: 20 }
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    backgroundColor: '#222',
    paddingTop: 20 + ReactStatusBar.currentHeight,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    position: 'relative',
    textAlign: 'left'
  },

  headerProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 1000
  },

  headerReal: {
    container: {
      width: '100%',
      backgroundColor: '#222',
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      display: 'flex',
      flexDirection: 'row'
    },
    imgCover: {
      width: 80,
      height: 80,
      marginRight: 18
    },
    trackInfo: {
      flex: 1
    },
    trackName: { color: '#FFF', fontWeight: 'bold', fontSize: 20, lineHeight: 22, marginBottom: 4 },
    trackArtistAlbum: { color: '#B5B5B5', fontSize: 12, lineHeight: 14 }
  },

  separation: {
    height: 1,
    width: '100%',
    backgroundColor: '#FFFFFF33',
    marginTop: 'auto'
  }
});
