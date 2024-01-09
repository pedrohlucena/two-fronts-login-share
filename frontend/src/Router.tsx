import { Route, Routes } from "react-router-dom";
import { Login } from './pages/Login/Login';
import { Page } from './pages/Page/Page';
import { api } from "./services";

export type PostLogin = {
  user: string;
  password: string;
}

export type PostLoginResponse = {
  access_token: string
}

export function Router() {
  const handleLogin = async ({ user, password }: PostLogin) => {
    const response = await api.post('/login', { user, password }, { withCredentials: true }, )
    const { access_token }: PostLoginResponse =  response.data
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/page" element={<Page isLogged={false} />} />
    </Routes>
  )
}
