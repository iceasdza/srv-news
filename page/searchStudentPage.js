import React from 'react';
import { Container, Header, Left, Right, Button, Icon } from 'native-base';
import {StyleSheet,Text,View} from 'react-native';
export default class SearchStudent extends React.Component {

    back=()=>{
        this.props.navigation.navigate('Home')
    }
  render() {
    return (
        <View><Text>tesst</Text></View>
    )
  }
}

const styles = StyleSheet.create({
header:{
  paddingTop:30,
  paddingBottom:10,
  backgroundColor:'#7aadff'
},
textHeader:{
  color:"white"
}
});

