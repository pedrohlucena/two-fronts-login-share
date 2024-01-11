import { useEffect, useState } from "react";
import { api } from "../../services";
import * as S from './styles';

export function Users() {
  const [users, setUsers] = useState([''])

  const getUsers = async () => { 
    const { items } = (await api.get('/users')).data
    setUsers(items)
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  return <S.UsersContainer>
      <ul>{users.map(user => <li>{user}</li>)}</ul>
      <button onClick={getUsers}>get users</button>
  </S.UsersContainer>
}