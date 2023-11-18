import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './routes/mainRoute';
import './App.css';
import { Header } from './components/header/Header';

function App() {
  return (
    <div className="App bg-backgroundPrimary pt-4">
      <div className=' min-h-screen max-w-[1600px] mx-auto'>
        <Router>
          <Header />
          <div className='p-4'>
            <MainRoute />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
