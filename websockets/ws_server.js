// following this tutorial: https://blog.logrocket.com/how-to-implement-websockets-in-react-native/
const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const wss = new WebSocket.Server({ server });

const CLIENTS={};

app.get('/', (req,res)=>{
  res.send('success!')
})

app.post("/:id", (req, res) => {
  let { notification_content } = req.body
  let { notification_type } = req.body

  if (notification_type === 'Likes') res.send("Like received");

  console.log('Got body:', notification_content);
  console.log('num of clients: ', Object.keys(CLIENTS).length)
  console.log(notification_type)
  console.log(req.params)
  console.log(notification_content)
  if (req.params.id){
    if (CLIENTS[req.params.id]){
      //pass along ws message
      CLIENTS[req.params.id].send(JSON.stringify({notification_type: notification_type, notification_content: notification_content}))
        //response to app server
      console.log('client exists')
      res.send('client exists!')
    } else {
      res.send('no exist!')
      console.log('no exists')
    }
    // res.send(req.params.id)
  }
  res.send("Hello World!");
});

wss.on("connection", function connection(ws) {

  console.log('connected')

  ws.on("message", function incoming(message, isBinary) {
    message = JSON.parse(message)

    if (message.source === 'client'){
      //if client connects
      CLIENTS[message.id] = ws
    } else {
      //if message incoming from server
    }
    console.log(message, 'num of clients: ', Object.keys(CLIENTS).length)
  });
});

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
