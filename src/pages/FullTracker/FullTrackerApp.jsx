import { useState } from 'react';

// страницы трекера (практика 23)
import Home from '../../Home.jsx';
import Dashboard from '../../Dashboard.jsx';
import Login from '../../Login.jsx';
import Settings from '../../Settings.jsx';
import Statistics from '../../Statistics.jsx';

// практика 24 как отдельная страница
import Practice24App from '../Practice24/Practice24App.jsx';

function FullTrackerApp() {
  // добавили значение 'practice24'
  const [page, setPage] = useState('home'); // 'home' | 'dashboard' | 'login' | 'settings' | 'stats' | 'practice24'

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>

        <nav className="sub-nav">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('dashboard')}>Dashboard</button>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('settings')}>Settings</button>
          <button onClick={() => setPage('stats')}>Statistics</button>
          <button onClick={() => setPage('practice24')}>Практика 24</button>
        </nav>
      </header>

      <main className="page-container">
        {page === 'home' && <Home />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'login' && <Login />}
        {page === 'settings' && <Settings />}
        {page === 'stats' && <Statistics />}
        {page === 'practice24' && <Practice24App />}
      </main>
    </div>
  );
}

export default FullTrackerApp;
