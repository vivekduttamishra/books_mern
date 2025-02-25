import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './commons/components/Header'
import routes from './Routes'
import NotFoundScreen from './commons/screens/NotFoundScreen'
function App() {
  const [screenName,navigate]=useState('author-list-screen');

  const screen = routes[screenName];

  return (
    <div>
      <Header title="World Wide Books" navigate={navigate} />
      <div>
        <button onClick={()=>navigate('author-list-screen')}>Author List</button>
        <button onClick={()=>navigate('book-list-screen')}>Book List</button>
        <button onClick={()=>navigate('author-add-screen')}>Add Author</button>
        <button onClick={()=>navigate('book-add-screen')}>Add Book</button>
        <button onClick={()=>navigate('user-login-screen')}>Login</button>
        <button onClick={()=>navigate('user-registration-screen')}>Register</button>
      </div>
      <div className="screen container">
        {screen || <NotFoundScreen/>}
      </div>
    </div>
  )
}

export default App
