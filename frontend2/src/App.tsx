import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AuthProvider, UsersProvider } from "./hooks";

export function App() {
  return <BrowserRouter>
    <AuthProvider>
      <UsersProvider>
        <Router />
      </UsersProvider>
    </AuthProvider>
  </BrowserRouter>
}
