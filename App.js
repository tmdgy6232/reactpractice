//This is an example code to understand AsyncStorage// 
import React, { Component } from 'react';
//import react in our code. 
 
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { Buffer } from 'buffer';
import aesjs from 'aes-js';
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      textInputData: '',
      //to get the value from the TextInput
      getValue: '',
      //to set the value on Text
    };
  }
  saveValueFunction = () => {
    //function to save the value in AsyncStorage
    if(this.state.textInputData){
      //To check the input not empty
      AsyncStorage.setItem('any_key_here', this.state.textInputData);
      console.log(this.state.textInputData);
      const iv = Buffer.from(this.state.textInputData); // 기초 벡터값 인자로 16byte의 데이터가 꼭 들어가야 함, Buffer타입으로 데이터 반환
      console.log(iv);
      const key = Buffer.from(iv); // Buffer타입으로 데이터 반환 unicode array
      console.log(key);
      const aesCbc = new aesjs.ModeOfOperation.cbc(iv, key); //cbc타입 블록체이닝 생성
      console.log(aesCbc);
      const dataBytes = aesjs.utils.utf8.toBytes('tmdgyLL5232'); // 암호화하고자 하는 string형 데이터 unicode Array타입으로 변환
      console.log(dataBytes);
      const encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(dataBytes)); // 바이트코드 암호화
      console.log(encryptedBytes);
      const hexEncrypt = aesjs.utils.hex.fromBytes(encryptedBytes); // 암호화 된 코드 16진수로 변환
      console.log(hexEncrypt);
      //Setting a data to a AsyncStorage with respect to a key 
      this.setState({ textInputData: '' })
      //Resetting the TextInput
      alert('Data Saved');
      //alert to confirm
    }else{
      alert('Please fill data');
      //alert for the empty InputText
    }
  };
  getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ getValue: value })
      //Setting the value in Text 
    );
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Enter Some Text here"
          value={this.state.textInputData}
          onChangeText={data => this.setState({ textInputData: data })}
          underlineColorAndroid="transparent"
          style={styles.TextInputStyle}
        />
        <TouchableOpacity
          onPress={this.saveValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.getValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> GET VALUE </Text>
        </TouchableOpacity>
        <Text style={styles.text}> {this.state.getValue} </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
    marginTop:60
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#808000',
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#808000',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});