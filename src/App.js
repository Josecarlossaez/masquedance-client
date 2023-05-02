
import './App.css';
import Navbar from './components/Nav/Navbar';
import { Routes, Route } from 'react-router';
import Home from './components/Home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import CreateProduct from './components/product/CreateProduct';
import Admin from './pages/Admin';
import CreateTrack from './components/track/CreateTrack';
import CreateDj from './components/dj/CreateDj';
import ListProducts from './components/product/ListProducts';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/create-product' element= {<CreateProduct/>}/>
      <Route path='/create-track' element= {<CreateTrack/>}/>
      <Route path='/admin' element= {<Admin/>}/>
      <Route path='/create-dj' element= {<CreateDj/>}/>
      <Route path='/list-products' element= {<ListProducts/>}/>

    </Routes>
    
    </div>
  );
}

export default App;
