import React from 'react';
import {StyleSheet, Text, TextInput, View, Image, Picker, Button, Alert} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {selected: 0, rates: [], ready: false, userInput: '', result: '' }
}

getRates() {
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        rates: responseJson.rates,
        ready: true,
      });
    })
    .catch(error => {
      Alert.alert(error);
    });
}

  componentWillMount() {
   this.getRates();
  }

  convertMoney = () => {
    let userInput = this.state.userInput;
    let rate = this.state.selected;
    let converted = userInput / rate;
    let convertedString = 'That makes '+converted+' in EUR ';
    this.setState({result: convertedString});
  };

  render() {


      if (this.state.ready == false) {
            return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
      return (
      <View style={styles.container}>

        <View style={styles.container}>
          <Image source={{uri: 'https://softstribe.com/wp-content/uploads/2016/01/Currency-Converter-Widget-in-WordPress-widget.png'}} style={{width: 150, height: 150}} />
        </View>

        <View style={styles.container}>
        <TextInput
        keyboardType="numeric"
        style={{fontSize: 18, width: 100}}
        onChangeText={userInput => this.setState({userInput})}
        value={this.state.userInput}
        />
        <Picker
          style={{ width: 100 }}
          selectedValue={this.state.selected}
          onValueChange={(itemValue) => this.setState({selected: itemValue})}>
          {Object.keys(this.state.rates).map((key, i) => {
            return <Picker.Item label={key} value={this.state.rates[key]} key={i} />;
          })}
          </Picker>
          <Button onPress={this.convertMoney} title="Convert" />
          <Text>{this.state.result}</Text>
        </View>

        <View style={styles.container}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
