const functions = require("firebase-functions");
const axios = require("axios");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.sendPushNotification = functions.database
  .ref("news/{id}")
  .onCreate(event => {
    const db = admin.database();
    const root = db.ref("users");

    return root.once('value',snapshot=>{
       snapshot.forEach(childSnapshot=>{
           var expoToken = childSnapshot.val().token 
           if(expoToken){
               console.log(expoToken.token)
      axios.post('https://exp.host/--/api/v2/push/send',{
      "to": expoToken.token,
      "title": "sawad dee ja",
      "body": "HELLO EUIEIEIEIEIEI"
    })
           }
       })
    })

    //     root.child("/users").once('value').then(snapshot=>{
    //         snapshot.forEach(childSnapshot=>{
    //             var expoToken = childSnapshot.val().token

    //             if(expoToken){
    //                 const resp = axios.post('https://exp.host/--/api/v2/push/send',{
    //   "to": "ExponentPushToken[y8LNpNPkeAWlfetqpcg571]",
    //   "title": "hello",
    //   "body": "world"
    // }).then(console.log(resp))
    //             }
    //         })
    //     })
  });
