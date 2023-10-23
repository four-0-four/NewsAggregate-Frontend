import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './routes/mainRoute';
import './App.css';
import { Header } from './components/header/Header';

function App() {
  return (
    <div className="App bg-backgroundPrimary min-h-screen p-4 pb-0">
      <Router>
        <Header />
        <div className='p-4'>
          <MainRoute />
        </div>
      </Router>
    </div>
  );
}

export default App;
