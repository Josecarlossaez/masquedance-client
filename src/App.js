
import './App.css';
import Navbar from './components/Nav/Navbar';
import { Routes, Route } from 'react-router';
import Home from './components/Home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/login' element= {<Login/>}/>

    </Routes>
    
    </div>
  );
}

export default App;
