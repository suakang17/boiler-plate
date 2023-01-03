const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증처리를 하는 곳
    // 1. 클라이언트 쿠키에서 토큰 가져옴
    let token = req.cookies.x_auth;

    // 2. 토큰 복호화하여 유저 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();  // middleware에서 벗어나 다음 동작 하도록
    })
    // 3-1. 유저 존재시 인증 성공

    // 3-2. 유저 없을시 인증 실패

}

module.exports = { auth }