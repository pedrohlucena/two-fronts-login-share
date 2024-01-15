import { Route, Routes } from "react-router-dom";
import { Login, Users } from './pages';

export function Router() {  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}
