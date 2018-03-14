import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,  FlatList} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {shoplist: [], text: ''}
  }


  onAdd = () => {
    this.setState({data: [...this.state.data, {key: this.state.text}], text: ''});
  }

  render() {
    
    return (
      <View style={styles.main}>

        <View style={styles.container}>
        <Text>{this.state.text}</Text>
          <TextInput  style={styles.textinput} 
            onChangeText={(text) => this.setState({text})} value={this.state.text} />
        </View>

        <View style={styles.button}>
          <Button onPress={this.onAdd} title=" ADD " />
        </View>

        <View style={styles.container}>
          <Text>Shopping List</Text>
          <FlatList data={this.state.data} renderItem={({item}) => <Text>{item.key}</Text>} />
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
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textinput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
