import React, { useState, useEffect } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import icon from '../src/assets/logo1.png';
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard({}) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 38.417508,
    longitude: 27.136348,
    latitudeDelta: 0.0009,
    longitudeDelta: 0.0009,
  });

  const [circleRadius, setCircleRadius] = useState(10);

  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0009,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    getLocation();
    fetch('https://firebasestorage.googleapis.com/v0/b/realtimeexpo-2a35c.appspot.com/o/toplanmaAlanlari.json?alt=media&token=6b3dc1df-1488-42a9-9f3d-cc85d2134b45')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  const [mapType, setMapType] = useState('standard');

  const toggleMapType = () => {
    if (mapType === 'standard') {
      setMapType('satellite');
    } else {
      setMapType('standard');
    }
  };

  const [markers, setMarkers] = useState([]);

  const fetchMarkers = async () => {
    try {
      const response = await fetch('https://firebasestorage.googleapis.com/v0/b/realtimeexpo-2a35c.appspot.com/o/toplanmaAlanlari.json?alt=media&token=6b3dc1df-1488-42a9-9f3d-cc85d2134b45');
      const data = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const updateCircleRadius = (region) => {
    const zoomLevel = Math.round(Math.log(0.99 / region.longitudeDelta) * Math.LN2);
    const newRadius = 2999 / Math.pow(5, zoomLevel);
    setCircleRadius(newRadius);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c =  2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
return distance;
};

const deg2rad = (deg) => {
return deg * (Math.PI / 180);
};

const findNearestMarker = async () => {
  if (markers.length === 0) {
    return;
  }

  let nearestMarker = markers[0];
  let minDistance = getDistance(mapRegion.latitude, mapRegion.longitude, nearestMarker.ENLEM, nearestMarker.BOYLAM);

  for (let i = 1; i < markers.length; i++) {
    const marker = markers[i];
    const distance = getDistance(mapRegion.latitude, mapRegion.longitude, marker.ENLEM, marker.BOYLAM);

    if (distance < minDistance) {
      minDistance = distance;
      nearestMarker = marker;
    }
  }

  const url = `https://www.google.com/maps/dir/?api=1&origin=${mapRegion.latitude},${mapRegion.longitude}&destination=${nearestMarker.ENLEM},${nearestMarker.BOYLAM}`;
  Linking.openURL(url);
};
  
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
                <Image
                    source={icon}  // Replace with your avatar image source
                    style={{width: 125, height: 100,  marginTop: 120, }}
                />
            </View>
      <MapView style={styles.map} region={mapRegion} mapType={mapType} onRegionChange={updateCircleRadius}>
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={{ latitude: marker.ENLEM, longitude: marker.BOYLAM }}>
            <Callout>
              <View>
                <View style={styles.calloutTitleContainer}>
                  <Text style={styles.calloutTitle}>Toplanma Alanı Bilgileri</Text>
                </View>
                <View style={styles.calloutContentContainer}>
                  <Text style={styles.calloutText}><Text style={styles.calloutTitle}>İlçe Adı: </Text>{marker['İLÇE ADI']}</Text>
                  <Text style={styles.calloutText}><Text style={styles.calloutTitle}>Toplanma Alanı Adı: </Text>{marker['TOPLANMA ALAN ADI']}</Text>
                  <Text style={styles.calloutText}><Text style={styles.calloutTitle}>Adres: </Text>{marker['ADRESİ']}</Text>
                  <Text style={styles.calloutText}><Text style={styles.calloutTitle}>Kapasite: </Text>{marker['KAPASİTE']}</Text>
                </View>
              </View>
            </Callout>
          </Marker>

        ))}
        <Circle center={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} radius={circleRadius} fillColor={'rgba(30, 144, 255, 1)'} strokeColor={'black'} />
      </MapView>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Image source={require('../src/assets/konum.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
        <Image source={require('../src/assets/satellite.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={findNearestMarker}>
    <MaterialIcons name="directions" size={40} color="black" />
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: '100%',
    height: 205,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
},

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    position: 'absolute',
    top: 170,
    right: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  mapTypeButton: {
    position: 'absolute',
    top: 120,
    right: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  uploadButton: {
    position: 'absolute',
    top:15,
    right: 0,
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 200,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'column', // Yeni eklenen stil özelliği
  },
  calloutText: {
    fontSize: 14,
    marginBottom: 3, // Yeni eklenen stil özelliği
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});