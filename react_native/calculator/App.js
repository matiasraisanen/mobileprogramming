import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Calculator from './Calculator';
import History from './History';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {num1: '', num2: '', result: '', data: [], text: ''}
  }

  render() {
    return(
      <CalcuApp/>
    );
  }
}

const CalcuApp = StackNavigator({
    Calculator: {screen: Calculator},
    History: {screen: History}
    });

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
