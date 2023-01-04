import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate();

  const onLogoutHandler = () => {
    axios.get(`/api/user/logout`)
        .then(response => {
          if(response.data.success === true){
            navigate('/loginpage');
            alert('로그아웃 되었습니다.');
          } else {
            alert('로그아웃 실패');
          };
        })
  }

  // useEffect(() => {  // 해당 컴포넌트 랜더링되자마자 실행하는 것
  //   axios.get('/api/hello')  // get req을 해당 ep로 서버에 요청
  //   .then(response => console.log(response))  // 서버서 돌아온 res를 로그에 찍음
  // }, [])
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh' ,flexDirection: 'column'}}>
    <h2>LandingPage</h2>
    <button onClick={ onLogoutHandler }>Logout</button>
    </div>
  )
}

export default LandingPage;