import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//context
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import Navbar from "./components/Navbar";
import Cliente from "./pages/Cliente/Cliente";
import Corretor from "./pages/Corretor/Corretor";

import DashboardClient from "./components/DashboardClient";
import DashboardCorretores from "./components/DashboardCorretores";

import DashboardIncorporadora from "./components/DashboardIncorporadora";
import Incorporadora from "./pages/Incorporadora/Incorporadora";

import EditClientes from './pages/EditClientes/EditClientes'
import EditCorretores from "./pages/EditCorretores/EditCorretores";
import EditIncorporadoras from "./pages/EditIncorporadoras/EditIncorporadoras";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          {user && <Navbar />}
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/clientes"
              element={user ? <DashboardClient /> : <Navigate to="/login" />}
            />
            <Route
              path="/corretores"
              element={
                user ? <DashboardCorretores /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/cliente/:id"
              element={user ? <Cliente /> : <Navigate to="/login" />}
            />
            <Route
              path="/corretor/:id"
              element={user ? <Corretor /> : <Navigate to="/login" />}
            />
            <Route
              path="/incorporadora/:id"
              element={user ? <Incorporadora /> : <Navigate to="/login" />}
            />
            <Route
              path="/incorporadoras"
              element={
                user ? <DashboardIncorporadora /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/clientes/edit/:id"
              element={user ? <EditClientes /> : <Navigate to="/login" />}
            />
            <Route
              path="/corretores/edit/:id"
              element={user ? <EditCorretores /> : <Navigate to="/login" />}
            />
            <Route
              path="/incorporadoras/edit/:id"
              element={user ? <EditIncorporadoras /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
