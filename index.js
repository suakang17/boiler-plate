// 작업 위치 IP db설정에 추가해놓고 시작하기 

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

//  application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//  application/json 데이터를 분석해 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  //  회원가입시 필요 정보들을 client에서 가져오면 그걸 db에 저장

  const user = new User(req.body)

  user.save((err, userInfo) => {  // mongodb save function
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})