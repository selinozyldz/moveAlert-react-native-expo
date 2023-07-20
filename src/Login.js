import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import icon from '../src/assets/logo2.png'

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error)
    }
  }

  // forget password
  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Şifre yenileme maili gönderildi!')
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <View style={styles.container}>
      <Image source={icon} style={{ width: 300, height: 300, marginTop: -50, }} />
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 32, top:-70 }}>
          Deprem Hareket Sistemi
        </Text>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 26, marginTop: -20 }}>
          Giriş Ekranı
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TextInput style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={styles.textInput}
          placeholder="Şifre"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 30, }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Hesabınız yok mu? Buradan kayıt olabilirsiniz.
        </Text>

      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { forgetPassword() }}
        style={{ marginTop: 20, }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Şifrenizi mi unuttunuz? Tıklayın.
        </Text>

      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
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