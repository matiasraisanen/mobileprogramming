import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Calculator extends React.Component {
  static navigationOptions = {title: 'Calculator'};

  constructor(props) {
    super(props);
    this.state = {num1: '', num2: '', result: '', data: [], text: ''}
  }

  onMinus = () => {
    this.setState({result: parseInt(this.state.num1) - parseInt(this.state.num2)});
    this.setState({data: [...this.state.data, {key: this.state.num1 + ' - ' + this.state.num2 + ' = ' + (parseInt(this.state.num1) - parseInt(this.state.num2))}]});
    this.setState({num1: '', num2: ''});

  }

  onPlus = () => {
    this.setState({result: parseInt(this.state.num1) + parseInt(this.state.num2)});
    this.setState({data: [...this.state.data, {key: this.state.num1 + ' + ' + this.state.num2 + ' = ' + (parseInt(this.state.num1) + parseInt(this.state.num2))}]});
    this.setState({num1: '', num2: ''});

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={{ fontSize:26}}>Simple calculator</Text>
          <TextInput keyboardType='numeric' style={styles.textinput} 
            onChangeText={(num1) => this.setState({num1})} value={this.state.num1} />
          <TextInput keyboardType='numeric' style={styles.textinput} 
            onChangeText={(num2) => this.setState({num2})} value={this.state.num2} />
          <Text style={{ fontSize:20}}>Result: {this.state.result} </Text>
        </View>

        <View style={styles.button}>
          <Button onPress={this.onPlus} title="|        +        |" />
          <Button onPress={this.onMinus} title="|        -        |" />
          <Button onPress={() => navigate('History', {history: this.state.data})} title="History"/>
        </View>

        <View style={styles.container}>
          <Text style={styles.blue}>History</Text>
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

  blue: {
    color: 'blue',
    fontWeight: 'bold',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});