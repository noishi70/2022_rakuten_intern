import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './components/footer/Footer';

function App() {
  const [mode, setMode] = useState('/');
  const info = {
    setMode: setMode,
  }

  return (
    <>
      <div className="App">
        <Footer {...info} />
        {mode}

      </div>
    </>
  )
}

export default App;
