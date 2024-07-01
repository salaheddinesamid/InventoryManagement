import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap";
import { useEffect, useState } from "react";
import { Dashboard } from "./Pages/Dashboard";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { NewProductForm } from './Pages/NewProductForm';
import { ProductDetail } from './Components/ProductDetails';
import { ProfileSettings } from './Components/ProfileSettings';
import Login from './Pages/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && token !== "null") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/newproduct' element={<NewProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </>
        ) : (
          <Route path='/' element={<Login setLoggedIn={setLoggedIn} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default App;