import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, Image } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userinput: '', answer: '', feedback: '', counter: 0}
  }

  randomize = () => {
    this.setState({answer: (Math.floor(Math.random() * 100) + 1)});
  }

  guess = () => {
    this.setState({counter: (this.state.counter +1)});

    if (this.state.userinput == this.state.answer) {
      Alert.alert('Number ' + this.state.answer + ' is correct! It took you '+ (this.state.counter +1) +' guesses.');
      this.setState({userinput: '', counter: 0, feedback: ''});
      this.setState({answer: (Math.floor(Math.random() * 100) + 1)});
    }

    else if (this.state.userinput > this.state.answer) {
      this.setState({feedback: 'Your guess of ' + this.state.userinput + ' is too high'});
      this.setState({userinput: ''});
    }

    else if (this.state.userinput < this.state.answer) {
      this.setState({feedback: 'Your guess of ' + this.state.userinput + ' is too low' });
      this.setState({userinput: ''});
    }

    else {
      this.setState({feedback: 'how did this happen?'});
    }

    return this.state.feedback;
  }

  componentDidMount() {
    this.setState({answer: (Math.floor(Math.random() * 100) + 1)});
  }

  render() {

    return (

      <View style={styles.container}>

          <View style={styles.container}>
            <Image source={require('./img/numgamelogo.jpg')} />
          </View>

          <View style={styles.container}>
            <Text>Guess a number between 1 and 100</Text>
            {/* DEVELOPER FEEDBACK
            <Text>Your Input: {this.state.userinput}</Text>
            <Text>Answer: {this.state.answer}</Text>
            <Text>Counter: {this.state.counter}</Text>
            */}

            <Text>{this.state.feedback}</Text>
            <TextInput keyboardType='numeric' style={styles.textinput} 
                onChangeText={(userinput) => this.setState({userinput})} value={this.state.userinput} />
            
            <Button onPress={this.guess} title="Guess" />
            {/* RANDOMIZER BUTTON
            <Button onPress={this.randomize} title="RNG" />
            */}

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

  textinput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },  
});
