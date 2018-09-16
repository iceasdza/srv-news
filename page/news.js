import React from "react";
import { Modal, Text, View, FlatList, RefreshControl,Image } from "react-native";
import { Body, Button, Card, CardItem, Container } from "native-base";
import firebase from "../page/provider/firebaseCfg";

var db = firebase.database();
var ref = db.ref("news");

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      news: [],
      header: "",
      body: "",
      image: ""
    };
  }

  setModalVisible(visible, header, body, image) {
    this.setState({ modalVisible: visible });
    this.setState({ header: header, body: body, image: image });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getNews().then(() => {
      this.setState({ refreshing: false });
    });
  };

  getNews = async () => {
    const resp = await ref.once("value", data => {
      news = [];
      for (var x in data.val()) {
        news.push(data.val()[x]);
      }
      console.log(news);
      this.setState({ news: news });
    });
  };

  componentDidMount = () => {
    this.getNews();
  };

  render() {
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={{ margin: 22 }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              >
                {this.state.header}
              </Text>
              <Text style={{ fontSize: 16 }}>{this.state.body}</Text>
              <View>
              <Image
              style={{width:350, height: 500}}
                source={{
                  uri:
                    this.state.image
                }}
              />
              </View>
              <Button
                success
                full
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text> ย้อนกลับ </Text>
              </Button>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.news}
          renderItem={({ item, index }) => (
            <Card key={index}>
              <CardItem
                button
                onPress={() => {
                  this.setModalVisible(true, item.header, item.body, item.img);
                }}
              >
                <Body>
                  <Text style={{ fontSize: 15 }}>วันที่ : {item.date}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    หัวข้อ : {item.header}
                  </Text>
                  <Text style={{ fontSize: 16 }} numberOfLines={1}>
                    เนื้อหา : {item.body}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </Container>
    );
  }
}
