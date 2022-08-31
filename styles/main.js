import { StyleSheet } from 'react-native';
import { StatusBar as ReactStatusBar } from 'react-native';

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
  },

  sendFAB: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 1000
  }
})

module.exports = {
  styles
}