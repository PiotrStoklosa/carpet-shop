import React from 'react';
import './App.css';
import Footer from "./FooterBar/Footer";
import MenuAppBar from "./NavBar/NavigationBar";
import Body from "./Body/Body";

function App() {
    return (
        <>
            <header  style={{minHeight: '10vh'}}>
                <MenuAppBar/>
            </header>
            <body
                style={{background: '#CCBDB2', color: '#FFFFFF', minHeight: '85vh'}}
            >
            <Body/>
            </body>
            <footer style={{background: '#684C38', bottom: '0', fontSize: '12px'}}>
                <Footer/>
            </footer>
        </>
    );
}

export default App;
