import { useEffect, useState } from "react";
import { useUsers } from "../../hooks";
import * as S from './styles';

export function Users() {
  const [users, setUsers] = useState([''])

  const { handleGetUsers } = useUsers()

  const handleLoadUsers = async () => { 
    handleGetUsers({ callback: (data, error) => {
      if(!error) setUsers(data!.items)
    } })
  }

  useEffect(() => {
    handleLoadUsers()
  }, [])
  
  return <S.UsersContainer>
    <ul>{users.map(user => <li>{user}</li>)}</ul>
    <button onClick={handleLoadUsers}>get users</button>
  </S.UsersContainer>
}