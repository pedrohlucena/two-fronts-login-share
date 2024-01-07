import axios from 'axios'
import { useEffect } from 'react'

function App() {
  useEffect(() => axios.get('http://localhost:3000/setCookie', { withCredentials: true }), [])
  
  return <h1>Hello World!</h1>
}

export default App
