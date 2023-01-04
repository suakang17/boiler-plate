import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [Nickname, setNickname] = useState("")
  const [PasswordCheck, setPasswordCheck] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value)
  }

  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();  // 버튼 눌렀을 때 page refresh 방지

    if(Password !== PasswordCheck) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    
    let body = {
      name: Name,
      nickname: Nickname,
      email: Email,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/loginpage');
        } else { alert('Error') }
      })
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'}}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type="name" value={Name} onChange={onNameHandler} />
        <label>NickName</label>
        <input type="nickname" value={Nickname} onChange={onNicknameHandler} />
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Password Check</label>
        <input type="passwordcheck" value={PasswordCheck} onChange={onPasswordCheckHandler} />
        <br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage