// 작업 위치 IP db설정에 추가해놓고 시작하기 

const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:1icOU9pq3jAtnnlU@cluster0.a3tvpqk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})