import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,  FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('shoplistdb.db');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {shoplist: [], text: '', amount: ''}
  }

  componentDidMount() {
    // Create course table
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopList (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
}

  saveItem = () => {
   db.transaction(tx => {
        tx.executeSql('insert into shopList (product, amount) values (?, ?)', [this.state.product, this.state.amount]);
      }, null, this.updateList)
  }

  deleteItem = (id) => {
  db.transaction(
    tx => {
      tx.executeSql(`delete from shopList where id = ?;`, [id]);
    }, null, this.updateList
  )
}

    updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopList', [], (_, { rows }) =>
        this.setState({shoplist: rows._array})
      );
    });
  }

  listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};

  render() {

    return (
      <View style={styles.main}>

        <View style={styles.container}>

          <TextInput  style={styles.textinput}
            placeholder='product'
            onChangeText={(product) => this.setState({product})}
            value={this.state.product} />

          <TextInput  style={styles.textinput}
            placeholder='amount'
            onChangeText={(amount) => this.setState({amount})}
            value={this.state.amount} />
            <Button onPress={this.saveItem} title=" ADD " />
        </View>

        <View style={styles.container}>
          <Text style={styles.bold}>Shopping List</Text>
          <FlatList
          keyExtractor={item => item.id}
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.amount}   </Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}>bought</Text></View>} data={this.state.shoplist} ItemSeparatorComponent={this.listSeparator}


          />
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({

  main: {
   flex: 1,
   backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
  },

  textinput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },

  bold: {
    fontWeight: 'bold',
    color: 'blue',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
