import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView} from 'react-native';
import{ MapView} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      markerLat: 0,
      markerLong: 0,
      region: {
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
      }
    };
  }

  findAddress = () => {
    let address= this.state.address
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',' + '&key=AIzaSyDKFi_EiRWy8WdisMl5GfXSWq9O5nKh0Yw';
    fetch(url)
      .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                markerLat: responseJson.results[0].geometry.location.lat,
                markerLong: responseJson.results[0].geometry.location.lng,
                region: { latitude: responseJson.results[0].geometry.viewport.northeast.lat,
                          longitude: responseJson.results[0].geometry.viewport.northeast.lng,
                          latitudeDelta: 0.0322,
                          longitudeDelta: 0.0221,
                        },
            });
        }) .catch((error) => {
          Alert.alert(error);
        });
}


  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={styles.container}>
		<MapView
      region={this.state.region}
      style={styles.map} >

    <MapView.Marker
       coordinate={{
         latitude: this.state.markerLat,
         longitude: this.state.markerLong}}
        title='Marker'/>

    </MapView>
    <View style={styles.container}>
      <TextInput placeholder='address' onChangeText={(address) => this.setState({address})} value={this.state.address} />
      <Button title="SHOW" onPress={this.findAddress} />
    </View>
</KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 8
  },
});
