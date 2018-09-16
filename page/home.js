import React from 'react';
import { Body, Button, Card, CardItem, Container, Content} from 'native-base';
import {StyleSheet,Text,View} from 'react-native';
import { Permissions, Notifications } from 'expo';
import firebase from '../page/provider/firebaseCfg'

var db = firebase.database()
var ref = db.ref('users')
export default class Home extends React.Component {

  state={
    token:'',
    students:[]
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;


    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    var token = await Notifications.getExpoPushTokenAsync()
    this.setState({token:token})
    
    userToken = token.substring(18,40)
    ref.child(userToken+"/token").set({
      token:token
    });

    var usersRef = ref.child(userToken);
    await usersRef.on('value', data => {
      users = []
      for (var x in data.val()) {
        users.push(data.val()[x])
      }
      // console.log(users[0])
      
      let list  = users[0]
      arr = []
      for (var a in list){
        arr.push(list[a])
        // console.log(arr)
      }


      this.setState({ students: arr })
    })
  }


  componentDidMount(){
    this.registerForPushNotificationsAsync()
  }
  render() {
    return (
        <Container>
          <Content>
          {this.state.students.map((data,index)=>(
            <Card key={index}>
            <CardItem header>
              <Text  style={{fontWeight:"bold",fontSize:20}}>ชื่อนักเรียน :{data.studentName}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text  style={{fontSize:16}}>ชั้นประถมศึกษาปีที่ : {data.studentClass}</Text>
                <Text  style={{fontSize:16}}>คุณประจำชั้น : {data.studentTeacher}</Text>
                <Text  style={{fontSize:14}}>รหัสนักเรียน : {data.code}</Text>
              </Body>
            </CardItem>
          </Card>
          ))}
          </Content>
        </Container>
        
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

