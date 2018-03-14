import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView} from 'react-native';
import{ MapView, Marker} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressLat: 0,
      addressLong: 0,
      markers: [],
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
    const addressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',' + '&key=AIzaSyDKFi_EiRWy8WdisMl5GfXSWq9O5nKh0Yw';

    fetch(addressUrl)
      .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                addressLat: responseJson.results[0].geometry.location.lat,
                addressLong: responseJson.results[0].geometry.location.lng,
                region: { latitude: responseJson.results[0].geometry.viewport.northeast.lat,
                          longitude: responseJson.results[0].geometry.viewport.northeast.lng,
                          latitudeDelta: 0.0322,
                          longitudeDelta: 0.0221,
                        },
            });
          })

        .catch((error) => {
          Alert.alert(error);
        })
        .then(this.findRestaurants);
      }

    findRestaurants = () => {
      const restaurantsUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +this.state.addressLat+ ',' +this.state.addressLong+ '&radius=500&type=restaurant&key=AIzaSyDKFi_EiRWy8WdisMl5GfXSWq9O5nKh0Yw';

      fetch(restaurantsUrl)
        .then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                markers: responseJson.results
              });
            })
            .catch((error) => {
              Alert.alert(error);
            });
    }


  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={styles.container}>
		<MapView
      region={this.state.region}
      style={styles.map}
    >
    {this.state.markers.map(marker => (
    <MapView.Marker
      coordinate={{latitude: marker.geometry.location.lat,
                  longitude: marker.geometry.location.lng
                }}
      title={marker.name}
      description={marker.vicinity}
      key={marker.id}
      image={marker.icon}
    />
  ))}
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
