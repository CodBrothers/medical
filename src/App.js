import './styles/App.css';
import { Login } from './components/Auth/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home"
import Doctor from './pages/Doctor';
import Patients from './pages/Patients';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/patients" element={<Patients />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
