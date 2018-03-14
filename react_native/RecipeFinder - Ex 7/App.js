import React from 'react';
import { Image, StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar } from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [], ingredient: ''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingredient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({recipes: responseJson.results});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.upper}>
        <StatusBar hidden={true} />
        <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.title}
          renderItem={({item}) =>(
            <Text>
            {item.title}
            {"\n"}
            <Image source={{uri: item.thumbnail}} style={{width: 200, height: 200}} />
            {"\n"}
            </Text>
          )}

          data={this.state.recipes}
          ItemSeparatorComponent={this.listSeparator} />
        </View>
        <View style={styles.lower}>
        <TextInput style={{fontSize: 18, width: 200}} placeholder='ingredient' onChangeText={(ingredient) => this.setState({ingredient})} />
        <Button title="Find" onPress={this.getRecipes} />
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
  upper: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lower: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
