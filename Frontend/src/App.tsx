import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Messenger from "./components/Messenger";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Rutas públicas protegidas */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Ruta protegida para Messenger */}
          <Route path="/messenger" element={
            <ProtectedRoute>
              <Messenger />
            </ProtectedRoute>
          } />
          
          {/* Ruta por defecto si el usuario no está autenticado */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
