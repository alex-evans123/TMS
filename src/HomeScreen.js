import React from 'react';
import {  BackHandler,View,ImageBackground } from 'react-native';
import ImageLoader from './ImageLoader';
import axios from 'axios';


export default class HomeScreen extends React.Component {
   
  static navigationOptions = {
  headerShown: false,
  };




    componentDidMount(){
      // Start counting when the page is loaded
      this.timeoutHandle = setTimeout(()=>{
        this.props.navigation.navigate("Setting");
      }, 5000);
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // works best when the goBack is async
        return true;
      });

  }

    render() { 
      
      return (
            <ImageBackground source={require('./Images/Background_.jpg')} style={{width: '100%', height: '100%',marginTop: -30 ,flex: 1, alignItems: 'center',justifyContent: 'center' }}>
            <ImageLoader
            style={{width: 180, height: 152}}
          source={require('./Images/Splash_Logo.png')}
          />
  </ImageBackground>
        
          
     
      );
    }
  }