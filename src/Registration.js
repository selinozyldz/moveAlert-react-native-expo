import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import icon from '../src/assets/logo2.png'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://movealert-4f529.firebaseapp.com',
        })
          .then(() => {
            alert("Email sent")
          }).catch((error) => {
            alert(error)
          })
          .then(() => {
            firebase.firestore().collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              })
          })
          .catch((error) => {
            alert(error)
          })
      })
      .catch((error) => {
        alert(error)
      })
  }


  return (
    <View style={styles.container}>
      <Image source={icon} style={{width: 300, height: 300, marginTop: -55,}} />
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 32, top:-70 }}>
          Deprem Hareket Sistemi
        </Text>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 26, marginTop: -20 }}>
          Kayıt Ekranı
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TextInput style={styles.textInput}
          placeholder="Adınız"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
          borderRadius={10}
        />
        <TextInput style={styles.textInput}
          placeholder="Soyadınız"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
          borderRadius={10}
        />
        <TextInput style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          borderRadius={10}
        />
        <TextInput style={styles.textInput}
          placeholder="Şifre"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          borderRadius={10}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: -5,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#87CEFA',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
    height: 50,
    width: 150,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});