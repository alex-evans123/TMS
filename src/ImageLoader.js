import React from 'react';
import {  View, Text,Image,Alert,Button,TouchableOpacity,TextInput,StyleSheet , Animated } from 'react-native';

export default class ImageLoader extends React.Component{

    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [3.85, 1.5],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />
      );
    }
  
  
  }