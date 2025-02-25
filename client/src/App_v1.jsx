import { useState } from 'react'



import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './commons/components/Header'
import BookListScreen from './books/screens/BookListScreen'
import AuthorListScreen from './authors/screens/AuthorListScreen'
import AuthorAddScreen from './authors/screens/AuthorAddScreen'
import AuthorDetailsScreen from './authors/screens/AuthorDetailsScreen'
import BookAddScreen from './books/screens/BookAddScreen'
import BookDetailsScreen from './books/screens/BookDetailsScreen'
import UserLoginScreen from './users/screens/UserLoginScreen'
import UserRegistrationScreen from './users/screens/UserRegistrationScreen'
import NotFoundScreen from './commons/components/NotFoundScreen'
import Conditional from './utils/components/Conditional'

function App() {
  const [screen,setScreen]=useState('author-list-screen');


  return (
    <div>
      <Header title="World Wide Books" navigate={setScreen} />
      <div>
        <button onClick={()=>setScreen('author-list-screen')}>Author List</button>
        <button onClick={()=>setScreen('book-list-screen')}>Book List</button>
        <button onClick={()=>setScreen('author-add-screen')}>Add Author</button>
        <button onClick={()=>setScreen('book-add-screen')}>Add Book</button>
        <button onClick={()=>setScreen('user-login-screen')}>Login</button>
        <button onClick={()=>setScreen('user-registration-screen')}>Register</button>
      </div>

      <div className="screen container">
        
        
      <Conditional condition={screen==='author-list-screen'}>
        <AuthorListScreen/>
      </Conditional>
      
      {screen==='author-list-screen' && <AuthorListScreen/>}
      {screen==='book-list-screen' && <BookListScreen/>}
      {screen==='author-add-screen' && <AuthorAddScreen/>}
      {screen==='author-details-screen' && <AuthorDetailsScreen/>}
      {screen==='book-add-screen' && <BookAddScreen/>}
      {screen==='book-details-screen' && <BookDetailsScreen/>}
      {screen==='user-login-screen' && <UserLoginScreen/>}
      {screen==='user-registration-screen' && <UserRegistrationScreen/>}
      
      </div>
    </div>
  )
}

export default App
