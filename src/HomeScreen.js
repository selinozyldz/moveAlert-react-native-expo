import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet ,TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import callCloudVisionAPI from '../src/callCloudVisionAPI';
import icon from '../src/assets/logo1.png';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

const HomePage = () => {
    const [selectedOption, setSelectedOption] = useState('evim');
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = firebase.auth().onAuthStateChanged((authUser) => {
            setUser(authUser);
            if (authUser) {
                getPhotosByOption(authUser.uid, selectedOption);
            }
        });

        return () => {
            checkUser();
        };
    }, [selectedOption]);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleAddPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Fotoğraf izni reddedildi.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && user) {
            const newPhoto = { uri: result.uri, type: selectedOption };
            uploadPhoto(result.uri, selectedOption, user.uid);
            setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
        }
    };

    const getPhotosByOption = async (userId, option) => {
        const imagesRef = storage.ref().child(`photos/${userId}/${option}`);
        const imagesSnapshot = await imagesRef.listAll();
        const imageUrls = await Promise.all(
            imagesSnapshot.items.map((imageRef) => imageRef.getDownloadURL())
        );

        const fetchedPhotos = imageUrls.map((url) => ({ uri: url, type: option }));
        setPhotos(fetchedPhotos);
    };
    const uploadPhoto = async (uri, type, userId) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = `${Date.now()}.jpg`;
        const photoRef = storage.ref().child(`photos/${userId}/${type}/${filename}`);
        await photoRef.put(blob);

        // Kenar belirleme yapmak için Cloud Vision API'yi çağır
        const imageUri = await photoRef.getDownloadURL();
        callCloudVisionAPI(imageUri);
    };
    const renderPhotos = () => {

            return photos
            .filter((photo) => photo.type === selectedOption)
            .map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo.uri }} style={styles.photo} />
              </View>
            ));
    };


    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
            <Image
                    source={icon}  // Replace with your avatar image source
                    style={{width: 125, height: 100,  marginTop: -15, }}
                />
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleSelectOption('evim')}>
                    <Text style={styles.optionText}>Evim</Text>
                    <AntDesign name="home" size={35} color="#333333" left='20%' bottom='61%' />
                </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
                <TouchableOpacity onPress={() => handleSelectOption('isyerim')}>
                    <Text style={styles.optionText}>İş Yerim</Text>
                    <AntDesign name="file-markdown" size={35} color="#333333" left='15%' bottom='60%' />
                </TouchableOpacity>
            </View>
            {selectedOption && (
                <View style={styles.addPhotoContainer}>
                    <Text style={styles.addPhotoText}></Text>
                    <TouchableOpacity onPress={handleAddPhoto}>
                        <AntDesign name="pluscircleo" size={35} color="#333333" />
                    </TouchableOpacity>
                </View>
            )}
            {photos.length > 0 && (
                <View style={styles.uploadedPhotosContainer}>
                    <Text style={styles.uploadedPhotosText}></Text>
                    <ScrollView  >{renderPhotos()}</ScrollView>
                </View>
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 50,
        height: 1500,
        borderRadius: 25,
        marginTop: 10,
    },
    avatarContainer: {
        width: '100%',
        height: 70,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
    },
    optionsContainer: {
        borderBottomWidth: 2,
        width: 200,
        top: 36,
        borderRadius: 5,
    },
    optionContainer: {
        borderBottomWidth: 2,
        top: -30,
        left: '51%',
        width: 200,
        borderRadius: 5,
    },
    optionText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    addPhotoContainer: {
        left: 372,
        top: -190,
    },
    photoContainer: {
        left: 5,
        top: 10,
        marginBottom: 5,
        width: 400,
        height: 350,
        marginRight: 5,

    },
    photo: {
        width: '100%',
        height: '100%',
    },
    uploadedPhotosContainer: {
        top: -80,
        left: 5,
        width: 400,
        height: 500,
        marginRight: 5,
        flexDirection: 'row', // Yatay düzenleme için flex yönünü ayarlayın
        flexWrap: 'flex-start', // Yatay düzenleme için flex yönünü ayarlayın
    },
    
});

export default HomePage;