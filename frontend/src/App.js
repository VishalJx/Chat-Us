import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Chats from './components/Chats';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Chats/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
