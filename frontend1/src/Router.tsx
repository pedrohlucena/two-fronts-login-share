import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from './pages/Login/Login';
import { Users } from './pages/Users/Users';
import { api } from "./services";

export type PostLogin = {
  user: string;
  password: string;
}

export type PostLoginResponse = {
  access_token: string
}

export function Router() {
  const [isLogged, setIsLogged] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async ({ user, password }: PostLogin) => {
    const response = await api.post('/login', { user, password } )
    setIsLogged(response.status === 201)
    const { access_token }: PostLoginResponse =  response.data
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    navigate('/users')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/users" element={<Users isLogged={isLogged} />} />
    </Routes>
  )
}
