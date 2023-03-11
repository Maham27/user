import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home';
import Joinasalawyer from './pages/Joinasalawyer';
import { useSelector } from 'react-redux';
import Protectedroutes from './components/Protectedroutes';
import Publicroutes from './components/Publicroutes';

function App() {
  const {loading}=useSelector(state=>state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <Publicroutes>
              <Login />
            </Publicroutes>
          }
        />
        <Route
          path="/joinasalawyer"
          element={
            <Protectedroutes>
              <Joinasalawyer />
            </Protectedroutes>
          }
        />
        <Route
          path="/registration"
          element={
            <Publicroutes>
              <Registration />
            </Publicroutes>
          }
        />
        <Route
          path="/"
          element={
            <Protectedroutes>
              <Home />
            </Protectedroutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
