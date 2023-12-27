import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./FooterBar/Footer";
import MenuAppBar from "./NavBar/NavigationBar";
import Body from "./Body/Body";
import CarpetItemView from "./Body/CarpetItemView";
import {CartContextProvider} from "./Body/Cart";


function App() {
    return (
        <CartContextProvider>
            <header  >
                <MenuAppBar/>
            </header>
            <div style={{background: '#CCBDB2' }}>
                <div
                    style={{color: '#FFFFFF', minHeight: '85vh', maxWidth: '50%', margin: '0 auto', padding: '30px'}}
                >
                <Router>
                    <Routes>
                        <Route path="/" element={<Body/>}/>
                        <Route
                            path="/item/:itemID"
                            element={<CarpetItemView/>}
                        />

                    </Routes>
                </Router>
                </div>
            </div>

            <footer style={{background: '#684C38', bottom: '0', fontSize: '12px'}}>
                <Footer/>
            </footer>
        </CartContextProvider>
    );
}

export default App;
