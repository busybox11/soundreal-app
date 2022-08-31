import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Line, Polygon, Circle, Path } from 'react-native-svg';

import { Audio } from 'expo-av';

import { styles } from '../styles/main'

import { BaseSoundReal } from '../components/soundreal';
import { BaseMusicSource } from '../components/musicSources';

export class SendScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerElevation: 0,
      preview: {
        playing: false,
        id: undefined
      },
      step: 0
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

  backAction = () => {
    if (this.state.step == 1) {
      this.setState({
        step: 0
      })
    }
    return true
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
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

  sendAction() {
  }

  render() {
    const { step } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          stickyHeaderIndices={[0]}
          onScroll={(event) => {
            const scrolledAmount = event.nativeEvent.contentOffset.y
  
            this.setState({headerElevation: (scrolledAmount > 16) ? 8 : 0})
          }}
        >
          <View style={{...styles.header, elevation: this.state.headerElevation, backgroundColor: 'transparent'}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{flex: 1}}>
                <Text style={styles.text.title}>SoundReal</Text>
                <Text style={styles.text.subtitle}>It's time!</Text>
              </View>
  
              <Image
                style={styles.headerProfilePic}
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/29630035?s=160&v=4',
                }}
              />
            </View>
          </View>

          {step == 0 &&
            <View style={{padding: 20}}>
              <Text style={styles.text.title}>Choose a music source</Text>

              <View style={{paddingTop: 20}}>
                <BaseMusicSource
                  handleAction={() => {}}
                  sourceName={"Search"}
                  sourceIcon={(style) => { return (
                      <Svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M9 18V5l12-2v13" />
                        <Circle cx="6" cy="18" r="3" />
                        <Circle cx="18" cy="16" r="3" />
                      </Svg>
                    )}
                  }
                  style={{marginBottom: 20}}
                />

                <BaseMusicSource
                  handleAction={() => {
                    this.setState({
                      step: 1
                    })
                  }}
                  sourceName={"Spotify"}
                  sourceIcon={(style) => { return (
                      <Svg style={style} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12.722 7.69265C10.6559 6.46486 7.24663 6.35186 5.27351 6.95053C5.12132 6.99665 4.95704 6.98043 4.81682 6.90543C4.67659 6.83043 4.5719 6.7028 4.52578 6.55061C4.47965 6.39843 4.49587 6.23415 4.57087 6.09392C4.64587 5.95369 4.7735 5.849 4.92569 5.80288C7.18972 5.11606 10.9548 5.24829 13.3343 6.66041C13.4712 6.7416 13.5702 6.87385 13.6096 7.02805C13.6489 7.18226 13.6254 7.34579 13.5443 7.48268C13.4631 7.61956 13.3308 7.71858 13.1766 7.75796C13.0224 7.79734 12.8589 7.77384 12.722 7.69265Z" fill="transparent" />
                        <Path d="M12.6547 10.3117C12.5852 10.4247 12.4738 10.5054 12.3449 10.5362C12.2159 10.567 12.08 10.5454 11.967 10.476C10.244 9.41732 7.61689 9.11038 5.57805 9.72908C5.45395 9.75857 5.32328 9.7396 5.21269 9.67605C5.10209 9.6125 5.01991 9.50915 4.9829 9.38709C4.94589 9.26502 4.95685 9.13343 5.01353 9.01917C5.07021 8.9049 5.16835 8.81656 5.28793 8.77217C7.61608 8.06611 10.5108 8.40832 12.4896 9.62409C12.6026 9.69339 12.6835 9.80477 12.7145 9.93372C12.7455 10.0627 12.7239 10.1986 12.6547 10.3117Z" fill="transparent" />
                        <Path d="M11.8701 12.8587C11.8427 12.9035 11.8068 12.9425 11.7643 12.9735C11.7219 13.0044 11.6737 13.0266 11.6226 13.0389C11.5716 13.0512 11.5186 13.0533 11.4667 13.0451C11.4148 13.0368 11.365 13.0184 11.3203 12.9909C9.8144 12.0717 7.91983 11.8633 5.68785 12.3738C5.58444 12.3974 5.4759 12.3789 5.38609 12.3225C5.29629 12.2661 5.23259 12.1763 5.20899 12.0729C5.1854 11.9695 5.20385 11.8609 5.26029 11.7711C5.31672 11.6813 5.40652 11.6176 5.50993 11.594C7.95268 11.0362 10.0476 11.2758 11.737 12.3089C11.8274 12.3643 11.8922 12.4532 11.9171 12.5563C11.942 12.6593 11.9251 12.7681 11.8701 12.8587Z" fill="transparent" />
                        <Path d="M12.722 7.69265C10.6559 6.46486 7.24663 6.35186 5.27351 6.95053C5.12132 6.99665 4.95704 6.98043 4.81682 6.90543C4.67659 6.83043 4.5719 6.7028 4.52578 6.55061C4.47965 6.39843 4.49587 6.23415 4.57087 6.09392C4.64587 5.95369 4.7735 5.849 4.92569 5.80288C7.18972 5.11606 10.9548 5.24829 13.3343 6.66041C13.4712 6.7416 13.5702 6.87385 13.6096 7.02805C13.6489 7.18226 13.6254 7.34579 13.5443 7.48268C13.4631 7.61956 13.3308 7.71858 13.1766 7.75796C13.0224 7.79734 12.8589 7.77384 12.722 7.69265Z" stroke="currentColor" />
                        <Path d="M12.6547 10.3117C12.5852 10.4247 12.4738 10.5054 12.3449 10.5362C12.2159 10.567 12.08 10.5454 11.967 10.476C10.244 9.41732 7.61689 9.11038 5.57805 9.72908C5.45395 9.75857 5.32328 9.7396 5.21269 9.67605C5.10209 9.6125 5.01991 9.50915 4.9829 9.38709C4.94589 9.26502 4.95685 9.13343 5.01353 9.01917C5.07021 8.9049 5.16835 8.81656 5.28793 8.77217C7.61608 8.06611 10.5108 8.40832 12.4896 9.62409C12.6026 9.69339 12.6835 9.80477 12.7145 9.93372C12.7455 10.0627 12.7239 10.1986 12.6547 10.3117Z" stroke="currentColor" />
                        <Path d="M11.8701 12.8587C11.8427 12.9035 11.8068 12.9425 11.7643 12.9735C11.7219 13.0044 11.6737 13.0266 11.6226 13.0389C11.5716 13.0512 11.5186 13.0533 11.4667 13.0451C11.4148 13.0368 11.365 13.0184 11.3203 12.9909C9.8144 12.0717 7.91983 11.8633 5.68785 12.3738C5.58444 12.3974 5.4759 12.3789 5.38609 12.3225C5.29629 12.2661 5.23259 12.1763 5.20899 12.0729C5.1854 11.9695 5.20385 11.8609 5.26029 11.7711C5.31672 11.6813 5.40652 11.6176 5.50993 11.594C7.95268 11.0362 10.0476 11.2758 11.737 12.3089C11.8274 12.3643 11.8922 12.4532 11.9171 12.5563C11.942 12.6593 11.9251 12.7681 11.8701 12.8587Z" stroke="currentColor" />
                        <Circle cx="9" cy="9" r="7.95" stroke="currentColor" strokeWidth="2" />
                      </Svg>
                    )}
                  }
                  style={{marginBottom: 20, backgroundColor: '#1DB954'}}
                />
              </View>
            </View>
          }
          
          {step == 1 && 
            <View>
              <BaseSoundReal
                id={1}
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
                standalone={true}
              />
              <Text style={{ color: '#FFFFFF50', padding: 20}}>Add a description...</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.sendAction}
                style={styles.sendFAB}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Line x1="22" y1="2" x2="11" y2="13" />
                  <Polygon points="22 2 15 22 11 13 2 9 22 2" />
                </Svg>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>

        <StatusBar style="light" />
      </SafeAreaView>
    )
  }
}