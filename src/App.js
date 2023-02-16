
import './App.css';
import Navbar from './components/Nav/Navbar';
import { Routes, Route } from 'react-router';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element= {<Home/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
