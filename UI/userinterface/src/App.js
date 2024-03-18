import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap";
import {Dashboard} from "./Pages/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { NewProductForm } from './Pages/NewProductForm';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/newproduct' element={<NewProductForm/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
