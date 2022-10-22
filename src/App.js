import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';  

//hooks
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Clientes from './pages/Clientes/Clientes';
import Corretores from './pages/Corretores/Corretores';
import Navbar from './components/Navbar';
import Cliente from './pages/Cliente/Cliente';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>        
        <BrowserRouter>
        { user && <Navbar /> }
          <Routes>
            <Route 
              path="/login" 
              element={ !user ? <Login /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/" 
              element={ user ? <Home /> : <Navigate to="/login"/>} 
            />
            <Route 
              path="/clientes" 
              element={ user ? <Clientes /> : <Navigate to="/login"/>} 
            />
            <Route 
              path="/corretores" 
              element={ user ? <Corretores /> : <Navigate to="/login"/>} 
            />
            <Route 
              path="/cliente/:id" 
              element={ user ? <Cliente /> : <Navigate to="/login"/>} 
            />
          </Routes>      
        </BrowserRouter>
      </AuthProvider>




    </div>  
  )
}

export default App;
