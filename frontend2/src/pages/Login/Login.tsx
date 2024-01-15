import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { api } from '../../services';
import * as S from './styles';

export function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const { handleSignIn }= useAuth()

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    handleSignIn({ user, password, callback: (data, error) => {
      if (!error) {
        const { access_token } = data!;
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        navigate('/users');
      }
    } })
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

        <button type='submit' onClick={handleLogin}>Logar</button>
    </S.LoginForm>
  </S.LoginContainer>
}