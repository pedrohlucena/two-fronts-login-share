import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { api } from '../../services';
import * as S from './styles';

type UsersProps = {
  isLogged: boolean;
}

export function Users({ isLogged }: UsersProps) {
  const [users, setUsers] = useState([''])

  const getUsers = async () => { 
    const { items } = (await api.get('/users')).data
    setUsers(items)
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  return <S.UsersContainer>
    {isLogged && <>
      <ul>{users.map(user => <li>{user}</li>)}</ul>
      <button onClick={getUsers}>get users</button>
    </>}
    {!isLogged && <h1>Please, <NavLink to='/login'>login</NavLink> to see this page</h1>}
  </S.UsersContainer>
}
