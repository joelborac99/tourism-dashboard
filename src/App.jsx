import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminControl from "./pages/AdminControl";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />

      {/* 🔒 Admin-only route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminControl />
          </AdminRoute>
        }
      />

      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Destination" element={<Destination />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="main">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
