import React from 'react';
import { Container, Header, Left, Right, Button, Icon } from 'native-base';
import {StyleSheet,Text,View} from 'react-native';
export default class Home extends React.Component {

    goToSearch = () =>{
        this.props.navigation.navigate('Search')
    }

  render() {
    return (
        <View><Text>HOME</Text></View>
        //   <Container>
    //     <Header style={styles.header}>
    //       <Left>
    //         <Button transparent>
    //           <Icon name='md-mail' />
    //           <Text style={styles.textHeader}>NEWS</Text>
    //         </Button>
    //       </Left>
    //       <Right>
    //         <Button transparent onPress={this.goToSearch}>
    //           <Text style={styles.textHeader}>ADD</Text>
    //           <Icon name='md-add' />
    //         </Button>
    //       </Right>
    //     </Header>
    //   </Container>
    );
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

