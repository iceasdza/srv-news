import { Body, Button, Card, CardItem, Container, Content, Form, Icon, Input, Item, Label } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import firebase from '../page/provider/firebaseCfg'
import { Notifications } from 'expo';
const firebaseApp = firebase
var db = firebase.database()
var ref = db.ref('users')
export default class SearchStudent extends React.Component {

  state = {
    code: "",
    studentName: "",
    studentClass: "",
    studentTeacher: "",
    msg: "<Text>TEST</Text>",
    isSuccess: false,
    token:"",
    buttonStatus:false
  };

  registerForPushNotificationsAsync = async () => {

    var token = await Notifications.getExpoPushTokenAsync()

    userToken = token.substring(18,40)
    this.setState({token:userToken})
    
  }

  addStudent = async() =>{
    var hopperRef = ref.child(this.state.token);
    var student = hopperRef.child('students')
    student.push({
        code:this.state.code,
        studentName:this.state.studentName,
        studentClass:this.state.studentClass,
        studentTeacher:this.state.studentTeacher
    });
    alert("เพิ่มนักเรียนแล้ว")
    this.setState({buttonStatus:true,code:""})
  }


  findStudent = async () => {
    this.setState({buttonStatus:false})
    let student = []
    const ref = await firebaseApp.database().ref('students')
    ref.orderByChild("code").equalTo(this.state.code).on("value", (data) => {

      if (data.val() === null) {
        this.setState({
          msg: "student not found",
          studentName: "",
          studentClass: "",
          studentTeacher: "",
          code: "",
          isSuccess: false
        })

        alert('ไม่พบนักเรียน')
      } else {
        for (var x in data.val()) {
          student.push(data.val()[x])
        }
        this.setState({
          msg: '',
          studentName: student[0].name,
          studentClass: student[0].class,
          studentTeacher: student[0].teacher,
          isSuccess: true

        })
      }

    })
  }

  componentDidMount(){
    this.registerForPushNotificationsAsync()
    console.log("button state ",this.state.buttonStatus)
  }

  render() {
    const isFound = this.state.isSuccess
    let card
    if (isFound) {
      card = <Card>
        <CardItem header>
          <Text style={{fontWeight:"bold",fontSize:20}}>ชื่อนักเรียน :{this.state.studentName}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{fontSize:16}}>ชั้นประถมศึกษาปีที่ : {this.state.studentClass}</Text>
            <Text style={{fontSize:16}}>คุณประจำชั้น : {this.state.studentTeacher}</Text>
          </Body>
        </CardItem>
        <Button info style={styles.addStudentButton} onPress={this.addStudent} disabled={this.state.buttonStatus}>
            <Text>เพิ่มนักเรียนลงในรายชื่อ</Text>
          </Button>
      </Card>
      console.log(isFound)
    } else {
      card = <Text>กรุณาใส่เลขประจำตัวนเรียน</Text>
    }
    return (
      <Container>
        <Content>
          {this.state.isSuccess}
          {card}
          <Form>
            <Item floatingLabel>
              <Label>เลขประจำตัวนักเรียน</Label>
              <Input onChangeText={(code) => this.setState({ code })} value={this.state.code} />
            </Item>
          </Form>
          <Button full info onPress={this.findStudent} style={styles.searchButton}>
            <Icon name='search' />
            <Text>ค้นหานักเรียน </Text>
          </Button>
        </Content>
        {

        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  searchButton: {
    marginTop: 30,
    flex: 1,
  },
  addStudentButton:{
    margin:30,
    flex:1,
    padding:10
  },
  cardHeader: {
    alignContent: "center",
  }
});