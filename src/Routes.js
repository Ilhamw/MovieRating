import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Login from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import Home from './Screens/Home/Home';
import Search from './Screens/Home/Search';
import User from './Screens/Home/User';
import AuthLoadingScreen from './Screens/Auth/AuthLoading';

const AuthNav = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: false
        }
    },

    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
})

const TabNav = createMaterialBottomTabNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="search"
                    color={tintColor}
                    size={24}
                />
            ),
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    color={tintColor}
                    size={24}
                />
            ),
        }
    },
    User: {
        screen: User,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                    name={focused ? "user" : "user-o"}
                    color={tintColor}
                    size={24}
                />
            ),
        }
    },
},
    {
        initialRouteName: "Home",
        shifting: true,
        barStyle: { 
            backgroundColor: '#000',
            paddingVertical: 5,
         },
    })

const MySwitch = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    HomeTab: TabNav,
    Auth: AuthNav,
},
    {
        initialRouteName: "AuthLoading"
    })


export default createAppContainer(MySwitch)