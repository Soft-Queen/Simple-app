import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/signupForm';
import Users from './components/users';
import UserDetails from './components/userDetails';


const App = () => {
  return (
   
     <>

      <Router>
      <Routes>
          <Route path="/" element={< SignupForm/>} />
          <Route path="users" element={<Users />}>
          <Route path="details/:id" element={<UserDetails />} />
        </Route>
        </Routes>
      </Router>
      
     </>

  );
}

export default App;
