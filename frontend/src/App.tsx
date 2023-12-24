import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from "./FooterBar/Footer";
import MenuAppBar from "./NavBar/NavigationBar";

function App() {
  return (
      <>
        <header>
          <MenuAppBar />
        </header>
        <body
            style={{ background: '#CCBDB2', color: '#FFFFFF', minHeight: '85vh' }}
        >

        </body>
        <footer style={{ background: '#684C38', bottom: '0', fontSize: '12px' }}>
          <Footer />
        </footer>
      </>
  );
}

export default App;
