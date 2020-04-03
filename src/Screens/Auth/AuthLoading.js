import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    const userToken = await AsyncStorage.getItem('token');

    this.props.navigation.navigate(userToken ? 'HomeTab' : 'Auth');
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}