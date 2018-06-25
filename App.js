import React,{Component} from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createMaterialTopTabNavigator} from 'react-navigation'
import {Text,View,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default class App extends Component{
  render(){
    return(
      <SafeAreaView style={{flex:1}}>
        <AppTabNavigator/>
        </SafeAreaView>
    )
  }
}
class Home extends React.Component {
  render() {
    return (
      <View><Text>HOME</Text></View>
    )
  }
}

class Search extends React.Component {
  render() {
    return (
      <View><Text>Search</Text></View>
    )
  }
}
class News extends React.Component {
  render() {
    return (
      <View><Text>News</Text></View>
    )
  }
}
const AppTabNavigator  = createMaterialTopTabNavigator({
  Home :{screen:Home,
        navigationOptions:{
          tabBarLabel:'HOME',
          tabBarIcon:({tintColor})=>(
            <Icon name="md-home" color={tintColor} size={24}/>
          )
        }},

  Search:{screen:Search,
    navigationOptions:{
      tabBarLabel:'SEARCH',
      tabBarIcon:({tintColor})=>(
        <Icon name="md-person-add" color={tintColor} size={24}/>
      )
    }},

  News:{screen:News,
    navigationOptions:{
      tabBarLabel:'NEWS',
      tabBarIcon:({tintColor})=>(
        <Icon name="md-list" color={tintColor} size={24}/>
      )
    }}
},{
  initialRouteName:'Home',
  order:['Home','News','Search'],
  activeTintColor:'#7aadff',
  tabBarOptions:{
    style:{
      paddingTop:20
    }
  }
})