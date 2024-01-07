import axios from 'axios'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const blablabla = axios.get('http://localhost:3000/setCookie', {
      withCredentials: true
    })
    console.log(blablabla)
  }, [])

  return <h1>Hello World!</h1>
}

export default App
