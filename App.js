import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar as ReactStatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 30}}>SoundReal</Text>
        <Text style={{color: '#BBB', fontSize: 18}}>What are y'all listening to?</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    backgroundColor: '#222',
    paddingTop: 10 + ReactStatusBar.currentHeight,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    elevation: 2,
    position: 'relative',
    textAlign: 'left'
  }
});
