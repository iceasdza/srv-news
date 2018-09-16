const functions = require("firebase-functions");
const axios = require("axios");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.sendPushNotification = functions.database
  .ref("news/{id}")
  .onCreate(event => {

    var header = event.val().header
    var body = event.val().body

    const db = admin.database();
    const root = db.ref("users");

    return root.once('value',snapshot=>{
       snapshot.forEach(childSnapshot=>{
           var expoToken = childSnapshot.val().token 
           if(expoToken){
      axios.post('https://exp.host/--/api/v2/push/send',{
      "to": expoToken.token,
      "title": header,
      "body": body
    })
           }
       })
    })

  });