import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Balances from './components/Balances';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  listView: {
    padding: 0,
    margin: 0
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Balances style={styles.listView} />
      </View>
    );
  }
}
