// 작업 위치 IP db설정에 추가해놓고 시작하기 

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require("./models/User");
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

// application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json 데이터를 분석해 가져옴
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// register route

app.post('/api/user/register', (req, res) => {

  // 회원가입시 필요 정보들을 client에서 가져오면 그걸 db에 저장
  const user = new User(req.body)

  user.save((err, userInfo) => {  // mongodb save function
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


// login route

app.post('/api/user/login', (req, res) => {

  // 요청된 email db에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "등록되지 않은 이메일입니다."
      })
    }
  
  
  // 요청된 email이 db에 있을 때 pw 일치하는지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch)
    return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

  // pw 일치시 토큰 생성
    user.genToken((err, user) => {
      if(err) return res.status(400).send(err);

      // 토큰 저장 (쿠키에)
      res.cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id })
       })
    })
  })
})

// auth route
app.get('/api/user/auth', auth, (req, res) => {  // auth: middleware
  // middleware 통과해 온 결과들이 수행 == 즉 'auth == true'
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.name,
    nickname: req.user.nickname,
    role: req.user.role,
    image: req.user.image
  })
})


// logout route
app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
  , (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})