import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class History extends React.Component {
	static navigationOptions = {title: 'History'};

	constructor(props) {
    super(props);
	}


	render(){
		const {params} = this.props.navigation.state;
		return (
        <View style={styles.container}>
          <Text style={styles.bold}>History</Text>
          <FlatList data={params.history} renderItem={({item}) => <Text>{item.key}</Text>} />
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

  bold: {
    fontSize: 30,
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