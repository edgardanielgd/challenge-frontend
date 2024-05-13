import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/pages/Home';
import Notes from './components/pages/Notes';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';

import Navbar from './components/common/Navbar';

import "./styles/app.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<Notes />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
