import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

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
import NotFoundScreen from './commons/screens/NotFoundScreen'
import AuthorManageScreen from './authors/screens/AuthorManageScreen'
import PricingScreen from './commons/screens/PricingScreen'
import ConditionalTest from './commons/screens/ConditionalTest'

function App() {



  return (
    <div>
      <Router>
        <Header title="World Wide Books" />

        <div className="screen container">
          <Routes>
            <Route path="/" element={<AuthorListScreen />} />
            <Route path="/authors" element={<AuthorListScreen />} />
            <Route path="/authors" element={<AuthorListScreen />} />
            <Route path="/authors/add" element={<AuthorAddScreen />} />
            <Route path="/authors/manage" element={<AuthorManageScreen />} />
            <Route path="/authors/:id" element={<AuthorDetailsScreen />} />
            <Route path="/books" element={<BookListScreen />} />
            <Route path="/books/add" element={<BookAddScreen />} />
            <Route path="/books/:id" element={<BookDetailsScreen />} />
            <Route path="user/login" element={<UserLoginScreen />} />
            <Route path="user/register" element={<UserRegistrationScreen />} />
            <Route path="/pricing" element={<PricingScreen />} />
            <Route path="/test" element={<ConditionalTest />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </div>
      </Router>
    </div >
  )
}

export default App


