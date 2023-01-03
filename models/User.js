const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // 10자리 salt를 만들겠다
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    nickname: {
        type: String,
        maxlength: 30,
        unique: 1
    },
    role: {
        type: Number,
        default: 0
    },
    imgae: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;
    if(user.isModified('password')) {
    // pw 암호화

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
        });
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    // 복호화는 불가능하므로 plainPassword 암호화 결과와 암호화pw가 일치하는지 봐야함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.genToken = function(cb){
    var user = this;
    //jsonwebtoken사용해 token 생성
    var token = jwt.sign(user._id.toHexString(), 'userToken')
    // user._id + 'userToken' = token
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // decodes token
    jwt.verify(token, 'userToken', function(err, decoded){  // decoded에는 user._id 담겨있음
        // user._id 이용해 유저 찾은 뒤 클라이언트에서 가져온 token과 db에 보관된 token 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }