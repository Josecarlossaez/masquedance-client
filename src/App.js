
import './App.css';
import Navbar from './components/Nav/Navbar';
import { Routes, Route } from 'react-router';
import Home from './components/Home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import CreateProduct from './components/product/CreateProduct';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/create-product' element= {<CreateProduct/>}/>
      <Route path='/admin' element= {<Admin/>}/>

    </Routes>
    
    </div>
  );
}

export default App;
