const express = require('express');
var bodyParser = require('body-parser')
const snomeRoutes = require('./routes/snome.routes.js');
const userRoutes = require('./routes/user.routes.js')

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.use(express.json());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', false);
  next();
})

app.use('/snome', snomeRoutes);
app.use('/user', userRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});