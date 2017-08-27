import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Row from "./Row";
import { holdings, investment } from "../data/folio";

const styles = {
  container: {
    flex: 1,
    margin: 0,
    padding: 0
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8e8e8e',
  }
};

class Balances extends React.Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) =>
        r1.name !== r2.name ||
        r1.rateUSD !== r2.rateUSD ||
        r1.quantity !== r2.quantity
    });
    this.state = {
      holdings: {},
      investment: 0,
      coins: this.ds.cloneWithRows([])
    };
    this.fetchBalances = this.fetchBalances.bind(this);
    this.loadFolio = this.loadFolio.bind(this);
  }
  componentDidMount() {
    this.loadFolio().then(this.fetchBalances);
  }
  fetchBalances() {
    const { holdings, investment } = this.state;
    const coins = Object.keys(holdings);
    const baseUrl = "https://api.coinmarketcap.com/v1/ticker/";
    const pValues = coins.map(coinId => {
      const url = baseUrl + coinId + "/";
      return fetch(url)
        .then(resp => resp.json())
        .then(arr => {
          if(!arr || !arr.length)
            return {};
          const obj = arr[0];
          return {
            ...obj,
            rateUSD: obj.price_usd,
            quantity: holdings[obj.id], // quantity
            value: holdings[obj.id] * obj.price_usd // value in USD
          };
        });
    });
    Promise.all(pValues).then(coins => this.setState({
      coins: this.ds.cloneWithRows(coins)
    }));
  }
  loadFolio() {
    this.setState({
      holdings,
      investment
    });
    return Promise.resolve();
  }
  render() {
    const { coins } = this.state;
    return (
      <ListView
        style={styles.container}
        dataSource={coins}
        renderRow={data => <Row {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
    );
  }
}

export default Balances;