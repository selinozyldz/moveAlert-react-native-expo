import React, { useEffect, useState, useRef, } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { firebase } from '../config';


const ProfileScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [scrollEnabled] = useState(true);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Brown');
  const [email, setEmail] = useState('example@gmail.com');
  const [tel, setTel] = useState('+90 0555 555 55 55');
  const [birthDate, setBirthDate] = useState('dd/mm/yyyy');
  const [gender, setGender] = useState('Gender');
  const [adress, setAdress] = useState('example adress');
  const [height, setHeight] = useState('Height');
  const [weight, setWeight] = useState('Weight');
  const [bloodType, setBloodType] = useState('Blood Type');
  const [alergy, setAlergy] = useState('Alergy');
  const [chronicDiseases, setChronicDiseases] = useState('Chronic Disease');
  const [medicines, setMedicines] = useState('Medicines');
  const [obstacle, setObstacle] = useState('Obstacle');
  const [emergencyContact, setEmergencyContact] = useState('Emergency Contact');
  const [emergencyContactTel, setEmergencyContactTel] = useState('Emergency Contact Tel');
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut(); // Çıkış yapma işlemi

      navigation.navigate('Login'); // Çıkış yapıldıktan sonra Login ekranına yönlendirme
    } catch (error) {
      console.log('Çıkış yaparken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setTel(userData.tel);
        setGender(userData.gender);
        setBirthDate(userData.birthDate);
        setAdress(userData.adress);
        setHeight(userData.height);
        setWeight(userData.weight);
        setBloodType(userData.bloodType);
        setAlergy(userData.alergy);
        setChronicDiseases(userData.chronicDiseases);
        setMedicines(userData.medicines);
        setObstacle(userData.obstacle);
        setEmergencyContact(userData.emergencyContact);
        setEmergencyContactTel(userData.emergencyContactTel);

        if (userData.gender) {
          setGender(userData.gender);
        } else {
          setGender('');
        }
        if (userData.obstacle) {
          setObstacle(userData.obstacle);
        } else {
          setObstacle('');
        }
        if (userData.emergencyContact) {
          setEmergencyContact(userData.emergencyContact);
        } else {
          setEmergencyContact('');
        }
        if (userData.emergencyContactTel) {
          setEmergencyContactTel(userData.emergencyContactTel);
        } else {
          setEmergencyContactTel('');
        }
      } catch (error) {
        console.log('Profil verilerini alırken bir hata oluştu:', error);
        alert(error)
      }

    };

    fetchProfileData();
  }, []);

  const handleEditPress = () => {
    setEditing(!editing);
  };

  const handleSavePress = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      await firebase.firestore().collection('users').doc(userId).update({
        firstName, lastName, email, tel, gender, birthDate, adress, height, weight, bloodType, alergy, chronicDiseases, medicines, obstacle, emergencyContact, emergencyContactTel,
      });
      setEditing(false);
      alert('Profil güncellendi!');
    } catch (error) {
      alert('Profil güncellenirken bir hata oluştu:', error);
      alert(' Profil Bilgileri Boş Bırakılamaz!')
    }
  };



  // Kaydırma olayını işleyecek fonksiyon


  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/movealert-4f529.appspot.com/o/ben.png.jpeg?alt=media&token=d5217dd8-76e0-4cd3-8468-eef6db677cbb' }} // Replace with your avatar image source
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={[styles.name, styles.textWithShadow]}>{firstName} {lastName}</Text>
        </View>
        <View style={styles.content}>
        <View style={styles.contentContainer}>
          <Text style={styles.kisisel}>Kişisel Bilgiler</Text>
        </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Ad:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{firstName}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Soyad:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{lastName}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Telefon:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={tel}
                onChangeText={text => setTel(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{tel}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Cinsiyet:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={gender}
                onChangeText={text => setGender(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{gender}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Doğum Tarihi:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={birthDate}
                onChangeText={date => setBirthDate(date)}
              />
            ) : (
              <Text style={styles.infoValue}>{birthDate}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Adres:</Text>
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={adress}
                onChangeText={text => setAdress(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{adress}</Text>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.saglik}>Sağlık Bilgileri</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Boy:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={height}
                onChangeText={text => setHeight(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{height}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Kilo:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={weight}
                onChangeText={text => setWeight(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{weight}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Kan Grubu:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={bloodType}
                onChangeText={text => setBloodType(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{bloodType}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Alerjiler:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={alergy}
                onChangeText={text => setAlergy(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{alergy}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Kronik Hastalıklar:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={chronicDiseases}
                onChangeText={text => setChronicDiseases(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{chronicDiseases}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>İlaçlar:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={medicines}
                onChangeText={text => setMedicines(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{medicines}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infosLabel}>Fiziksel/Zihinsel Engel Durumu:</Text>
            {editing ? (
              <TextInput
                style={styles.infosValue}
                value={obstacle}
                onChangeText={text => setObstacle(text)}
              />
            ) : (
              <Text style={styles.infosValue}>{obstacle}</Text>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.acil}>Acil Durum Kişileri</Text>
          </View>
          <View style={styles.infoAContainer}>
            <Text style={styles.infoALabel}></Text>
            {editing ? (
              <TextInput
                style={styles.infoAValue}
                value={emergencyContact}
                onChangeText={text => setEmergencyContact(text)}
              />
            ) : (
              <Text style={styles.infoAValue}>{emergencyContact}</Text>
            )}
          </View>
          <View style={styles.infoKContainer}>
            <Text style={styles.infoKLabel}>:</Text>
            {editing ? (
              <TextInput
                style={styles.infoKValue}
                value={emergencyContactTel}
                onChangeText={text => setEmergencyContactTel(text)}
              />
            ) : (
              <Text style={styles.infoKValue}>{emergencyContactTel}</Text>
            )}
          </View>
        </View>
       
        <TouchableOpacity style={styles.editButton} onPress={editing ? handleSavePress : handleEditPress}>
          <Text style={styles.editButtonText}>{editing ? 'Kaydet' : 'Düzenle'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signButton} onPress={handleSignOut }>
          <Text style={styles.signButtonText}>{'Çıkış Yap'}</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    borderRadius: 5,
  },
  avatar: {
    marginTop: 40,
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#1E90FF',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -35,
    marginBottom: 20,
  },
  kisisel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    top: -15,
    backgroundColor: '#Fff',
    padding: 15,
  },
  infoContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 5,
    padding: 20,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    
    flex:1,
    fontSize: 16,
  },
  saglik: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  infosLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infosValue: {
    flex: 1,
    fontSize: 16,
  },
  acil: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  infoAContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom:5,
    padding: 15,
    width: 100, 
    height: 50,
  },
  infoKContainer: {
    left: 90,
    top: -55,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
    padding: 15,
    width: 290, 
    height: 50,
  },
  infoALabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoKLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoAValue: {
    fontWeight: 'bold',
    flex: 10,
    fontSize: 16,
  },
  infoKValue: {
    flex: 2,
    fontSize: 16,
  },
  editButton: {
    width: 100,
    bottom: 70,
    left:70,
    backgroundColor: '#1E90FF',
    position: 'absolute',
    padding: 15,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signButton: {
    width: 100,
    bottom: 70,
    right:70,
    backgroundColor: '#1E90FF',
    position: 'absolute',
    padding: 15,
    borderRadius: 10,
  },
  signButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default ProfileScreen;
