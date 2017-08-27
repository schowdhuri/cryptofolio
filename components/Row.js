import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    margin: 0
  },
  rateCol: {
    fontSize: 12,
    marginLeft: 12,
    width: 100
  },
  qtyCol: {
    fontSize: 12,
    marginLeft: 12,
    width: 100
  },
  valCol: {
    fontSize: 12,
    marginLeft: 12,
    width: 50
  },
  symbolCol: {
    fontSize: 16,
    fontWeight: "bold",
    width: 50
  }
});

function fix(value, decimals) {
    value = parseFloat(value);
    if(!isNaN(value))
        return value.toFixed(decimals);
    return value;
}

class Row extends React.Component {
  render() {
    const {
      quantity,
      rateUSD,
      symbol,
      value
    } = this.props;
    console.log(symbol, quantity, rateUSD, value)
    return (<View style={styles.container}>
        <Text style={styles.symbolCol}>{symbol}</Text>
        <Text style={styles.rateCol}>{fix(rateUSD, 6)}</Text>
        <Text style={styles.qtyCol}>{fix(quantity, 6)}</Text>
        <Text style={styles.valCol}>{fix(value, 2)}</Text>
    </View>);
  }
}

export default Row;
