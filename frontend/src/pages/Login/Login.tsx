import { useState } from 'react';
import { PostLogin } from '../../Router';
import * as S from './styles';

type LoginProps = {
  onLogin: ({ user, password } : PostLogin) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault()
    onLogin({ user, password })
  }

  return <S.LoginContainer>
    <S.LoginForm>
    <S.Login>
      <label htmlFor="login">Login: </label>
      <input id="login" type="text" value={user} onChange={e => setUser(e.target.value)} />
    </S.Login>

    <S.Password>
      <label htmlFor="password">Password: </label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </S.Password>

    <button onClick={handleLogin}>Logar</button>
  </S.LoginForm>
  </S.LoginContainer>
}