import React from 'react';
import { StyleSheet, Text, View, TextInput,  FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';
import{  List, ListItem, FormLabel, FormInput, Button } from 'react-native-elements';

const db = SQLite.openDatabase('shoplistdb.db');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {shoplist: [], product: '', amount: ''}
  }

  componentWillMount() {
    db.transaction(tx => {
      tx.executeSql('drop table shopList');
    });
    this.updateList();
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

        <View style={styles.top}>

          <FormLabel>PRODUCT</FormLabel>
            <FormInput placeholder='product'
            onChangeText={(product) => this.setState({product})}
            value={this.state.product} />

            <FormLabel>AMOUNT</FormLabel>
          <FormInput  style={styles.textinput}
            placeholder='amount'
            onChangeText={(amount) => this.setState({amount})}
            value={this.state.amount} />
            <Button raised icon={{name: 'save'}} onPress={this.saveItem} title="SAVE" />
        </View>

        <View style={styles.container}>
          <Text style={styles.bold}>Shopping List</Text>
          <List containerStyle={{alignSelf: 'stretch', minWidth: 250, marginBottom: 20}}>
            {
              this.state.shoplist.map((item, i) => (
                <ListItem
                key={i}
                title={item.product}
                subtitle={item.amount}
                rightTitle='bought'
                onPressRightIcon={() => this.deleteItem(item.id)}
                />
              ))
            }
          </List>
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
    justifyContent: 'flex-start',
  },

  top: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
