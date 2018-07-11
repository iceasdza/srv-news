import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { Text, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Search from './page/searchStudentPage'
import Home from './page/home'
import News from './page/news'

export default class App extends Component {

  render() {
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AppTabNavigator />
      </SafeAreaView>
    )
  }
}

const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'หน้าแรก',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-home" color={tintColor} size={24} />
      )
    }
  },

  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'ค้นหา',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-person-add" color={tintColor} size={24} />
      )
    },
  },

  News: {
    screen: News,
    navigationOptions: {
      tabBarLabel: 'ข่าวสาร',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-list" color={tintColor} size={24} />
      )
    }
  }
}, {
    initialRouteName: 'Home',
    order: ['Home', 'News', 'Search'],
    activeTintColor: '#7aadff',
    tabBarOptions: {
      style: {
        paddingTop: 20
      }
    }
  })