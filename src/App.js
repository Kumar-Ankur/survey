import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Dashboard from './components/dashboard';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="*" element={<Home />} />
    </Routes>
   </Router>
  );
}

export default App;
