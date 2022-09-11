import React, { Component , useState} from 'react';
import { Button, StyleSheet, View, Image, Text , TextInput,SafeAreaView, TouchableOpacity} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import UserSignUp from './screens/UserSignUp';

export default function WelcomePage () {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })
  const auth = getAuth();
  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      alert("User Loged IN")
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor:"#ffff"}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        <Image  height={10}
            width={10}
           source={require('./PHOTO-2022-09-06-21-56-03.jpg')} />
        </View>
        
      <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
          }}>Log In</Text>
      <Text style={{ color: 'red' }}>{value?.error}</Text>
      <View>
        <TextInput
          style={styles.body}
          placeholder="E-mail or  Username"
          onChangeText={(text) => setValue({ ...value, email: text })}
          underlineColorAndroid="transparent"
        />
     

        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setValue({ ...value, password: text })}
          underlineColorAndroid="transparent"
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color:"#2F5233",fontWeight:'700',marginBottom:5, textDecorationLine: "underline"}}>Forget password?</Text>
        </TouchableOpacity>
      </View>

    
       
        <View>
        <TouchableOpacity
         onPress={signIn}
         style={{
          backgroundColor:"#B1D8B7",
          padding: 20,
          borderRadius:10,
          marginBottom: 30,
         }}>
          <Text style={{ textAlign:"center", color:"#ffff",fontWeight:'700',fontSize:16}}>Login</Text>
        </TouchableOpacity>
      </View>
    

      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
            <Text style={{color: '#2F5233', fontWeight: '700',textDecorationLine: "underline"}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
 
  body: {
    borderWidth: 1,
    width: 300,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:"#ffff",
    padding: 20,
    borderRadius:10,
    marginBottom: 30,

  },

});
