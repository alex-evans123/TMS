import React from 'react';
import {  createAppContainer } from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/HomeScreen';
import Setting from './src/Setting';
import Login from './src/Login';
import UserDashboard from './src/UserDashboard';
import AdminDashboard from './src/AdminDashboard';

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Setting: Setting,
      Login:Login,
      UserDashboard:UserDashboard,
      AdminDashboard:AdminDashboard,
      
    },
    {
      initialRouteName: 'AdminDashboard',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
