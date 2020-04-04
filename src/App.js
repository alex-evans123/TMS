import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, ScrollView,
  Image, TextInput, TouchableOpacity,
  TouchableHighlight, ImageBackground,
} from 'react-native';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~assets/TMS.db' })



export default class App extends React.Component {


  constructor(props) {

    super(props)

    this.state = {

      UserName: '',
      API: '',
      UserPassword: '',
      UserManager: false,
      Id: 1,
      Logo: '',
    }



    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          // exists owner name John
          var row = results.rows.item(0);
          this.setState({ Logo: row.Logo });
          this.setState({ API: row.API });

        }
      });
    });

  }




  render() {

    return (

      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <ImageBackground source={require('./Images/Background.jpg')} style={{ width: '100%', height: 650, alignItems: 'center' }}>

            <Image
              source={{ uri: this.state.Logo }}
              style={{ marginTop: 10, width: 160, height: 130, alignItems: 'center' }}
            />

            <Text style={{ marginTop: 3, color: 'white', fontSize: 14, marginRight: 10 }}> {this.state.Logo}</Text>


            <Text style={{ marginTop: 30, color: 'white', fontSize: 15, marginRight: 170 }}> User Name</Text>


            <TextInput
              style={{ height: 35, borderRadius: 10, paddingLeft: 10, width: 250, height: 45, color: 'black', borderColor: 'white', borderBottomWidth: 1 }}
              placeholder='User Name '
              placeholderTextColor="#A0A0A0"
              backgroundColor=''
              onChangeText={UserName => this.setState({ UserName })}
              value={this.state.UserName}
            />

            <Text style={{ marginTop: 20, color: 'white', fontSize: 15, marginRight: 170 }}> Password</Text>
            <TextInput
              style={{ height: 35, paddingLeft: 10, borderRadius: 10, marginBottom: 5, height: 45, color: 'black', borderColor: 'white', width: 250, borderBottomWidth: 1 }}
              placeholder='Password  '
              placeholderTextColor="#A0A0A0"
              backgroundColor=''
              onChangeText={UserPassword => this.setState({ UserPassword })}
              secureTextEntry={true}
              value={this.state.UserPassword}

            />


            <TouchableOpacity style={{ marginLeft: 135 }} onPress={() => this.props.navigation.navigate('Setting')}><Text style={{ color: 'white', fontSize: 13 }}> Back To Settings</Text></TouchableOpacity>

            <View style={styles.buttonContainer}>

              <TouchableOpacity
                onPress={this.UserLoginFunction}><Text style={{ marginTop: 20, textAlign: 'center', borderRadius: 5, padding: 10, color: '#ffffff', fontSize: 15, backgroundColor: '#00b894', fontWeight: 'bold' }}> Login</Text></TouchableOpacity>

            </View>


          </ImageBackground>


        </ View>

      </ScrollView>

    );

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  buttonContainer: {
    width: 250,
    marginLeft: 10,
    marginTop: 10,


  },

});

