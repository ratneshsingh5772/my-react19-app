import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/program/AuthContextProvider';
import Home from './pages/Home';
import About from './pages/About';
import Theme from './pages/Theme';
import Authlogin from './pages/Authlogin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/authlogin" element={<Authlogin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
