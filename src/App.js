import {Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './page/Header';
import Shop from './page/Shop';
import ProductDetail from './page/ProductDetail';
import Info from './page/Info';
import LogIn from './page/LogIn';
import Join from './page/Join';
import Gallary from './page/Gallary';
import Cart from './page/Cart';

function App() {
    const handlePreventEvent = (e) =>{
        
    }
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Info" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Detail" element={<ProductDetail/>}></Route>
                <Route path="/Gallary" element={<Gallary/>}></Route>
                <Route path="/LogIn" element={<LogIn/>}></Route>
                <Route path="/Join" element={<Join/>}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>

            </Routes>
        </div>
    );
}

export default App;
