import React, { useEffect } from 'react';
import axios from 'axios';
// import { response } from 'express';

function LandingPage() {

  useEffect(() => {  // 해당 컴포넌트 랜더링되자마자 실행하는 것
    axios.get('/api/hello')  // get req을 해당 ep로 서버에 요청
    .then(response => console.log(response))  // 서버서 돌아온 res를 로그에 찍음
  }, [])
  
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage