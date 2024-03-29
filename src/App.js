
import './App.css';
import Navbar from './components/Nav/Navbar';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import CreateProduct from './components/product/CreateProduct';
import Admin from './pages/Admin';
import CreateTrack from './components/track/CreateTrack';
import CreateDj from './components/dj/CreateDj';
import ListProducts from './components/product/ListProducts';
import DetailsProduct from './components/product/DetailsProduct';
import Colections from './pages/Colections';
import ColectionDetails from './components/Colection/ColectionDetails';
import EditProduct from './components/product/EditProduct';
import ColectionEdit from './components/Colection/ColectionEdit';
import Cart from './pages/Cart';
import ListTrack from './components/track/ListTrack';
import ListBlogs from './components/blog/ListBlogs';
import AboutUs from './pages/AboutUs';
import ListDjs from './pages/ListDjs';
import DjDetails from './components/dj/DjDetails';
import UpdateDj from './components/dj/UpdateDj';
import MyAccount from './pages/MyAccount'
// Context
import { AuthContext } from "./context/auth.context";
import { useContext } from "react"
import Building from './pages/Building';
import Footer from './components/Footer/Footer';
import EditTwitchLink from './components/twitchLink/EditTwitchLink';
import OrderDetails from './components/Orders/OrderDetails';

function App() {
  const {isAdmin} = useContext(AuthContext)

  return (
    <div className="App">
     <Navbar/>
    <Routes>
      <Route path='/login' element= {<Login/>}/>
     
    
         <Route path='/' element= {<Home/>}/> 
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/create-product' element= {<CreateProduct/>}/>
      <Route path='/create-track' element= {<CreateTrack/>}/>
      <Route path='/admin' element= {<Admin/>}/>
      <Route path='/create-dj' element= {<CreateDj/>}/>
      <Route path='/list-colections' element= {<Colections/>}/>
      <Route path='/colection/:colectionId/details' element= {<ColectionDetails/>}/>
      <Route path='/product/:productId/details' element= {<DetailsProduct/>}/>
      <Route path="/list-products" element={<ListProducts/>}/>
      <Route path="/product/:productId/edit" element={<EditProduct/>}/>
      <Route path="/colection/:colectionId/edit" element={<ColectionEdit/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/list-tracks" element={<ListTrack/>}/>
      <Route path="/list-blogs" element={<ListBlogs/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="/list-djs" element={<ListDjs/>}/>
      <Route path='/dj/:djId/details' element= {<DjDetails/>}/>
      <Route path='/dj/:djId/update' element= {<UpdateDj/>}/>
      <Route path='/account' element= {<MyAccount/>}/>
      <Route path="/twitch-link/:twitchLinkId/edit" element= {<EditTwitchLink/>}/>
      <Route path="/orders/:orderId/details" element= {<OrderDetails/>}/>
   
        <Route path='/' element= {<Building/>}/>
      

      





    </Routes>
    <Footer/>
    
    </div>
  );
}

export default App;
