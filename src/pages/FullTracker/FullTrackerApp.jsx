import { useState } from 'react';

// страницы трекера (практика 23)
import Home from '../../Home.jsx';
import Dashboard from '../../Dashboard.jsx';
import Login from '../../Login.jsx';
import Settings from '../../Settings.jsx';
import Statistics from '../../Statistics.jsx';

// практики 24–26
import Practice24App from '../Practice24/Practice24App.jsx';
import Practice25App from '../Practice25/Practice25App.jsx';
import Practice26App from '../Practice26/Practice26App.jsx';

function FullTrackerApp() {
  // варианты: 'home' | 'dashboard' | 'login' | 'settings' | 'stats' | 'practice24' | 'practice25' | 'practice26'
  const [page, setPage] = useState('home');

  const btnClass = (name) =>
    page === name ? 'nav-btn nav-btn--active' : 'nav-btn';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>

        <nav className="sub-nav">
          <button className={btnClass('home')} onClick={() => setPage('home')}>
            Home
          </button>
          <button
            className={btnClass('dashboard')}
            onClick={() => setPage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={btnClass('login')}
            onClick={() => setPage('login')}
          >
            Login
          </button>
          <button
            className={btnClass('settings')}
            onClick={() => setPage('settings')}
          >
            Settings
          </button>
          <button
            className={btnClass('stats')}
            onClick={() => setPage('stats')}
          >
            Statistics
          </button>
          <button
            className={btnClass('practice24')}
            onClick={() => setPage('practice24')}
          >
            Практика 24
          </button>
          <button
            className={btnClass('practice25')}
            onClick={() => setPage('practice25')}
          >
            Практика 25
          </button>
          <button
            className={btnClass('practice26')}
            onClick={() => setPage('practice26')}
          >
            Практика 26
          </button>
        </nav>
      </header>

      <main className="page-container">
        {page === 'home' && <Home />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'login' && <Login />}
        {page === 'settings' && <Settings />}
        {page === 'stats' && <Statistics />}
        {page === 'practice24' && <Practice24App />}
        {page === 'practice25' && <Practice25App />}
        {page === 'practice26' && <Practice26App />}
      </main>
    </div>
  );
}

export default FullTrackerApp;
