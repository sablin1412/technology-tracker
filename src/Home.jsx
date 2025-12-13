// pages/Home.jsx
import React, { useState } from 'react';
import './App.css';
import useTechnologies from './useTechnologies.js';
import TechnologyCard from './TechnologyCard.jsx';
import TechnologyNotes from './TechnologyNotes.jsx';
import ProgressBar from './ProgressBar.jsx';
import QuickActions from './QuickActions.jsx';

function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    progress,
    setTechnologies
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  };

  const resetAllStatuses = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));
  };

  const chooseRandomNext = () => {
    setTechnologies(prev => {
      const notStarted = prev.filter(t => t.status === 'not-started');
      if (notStarted.length === 0) {
        alert('Нет технологий со статусом "Не начато" для выбора следующей.');
        return prev;
      }
      const randomId =
        notStarted[Math.floor(Math.random() * notStarted.length)].id;
      return prev.map(t =>
        t.id === randomId ? { ...t, status: 'in-progress' } : t
      );
    });
  };

  const filteredByStatus =
    filter === 'all'
      ? technologies
      : technologies.filter(t => t.status === filter);

  const filteredTechnologies = filteredByStatus.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page">
      <header className="progress-header-big">
        <h2>Прогресс изучения</h2>
        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#22c55e"
          height={18}
          animated={true}
        />
        <div className="filters-row center-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >Все</button>
          <button
            className={filter === 'not-started' ? 'active' : ''}
            onClick={() => setFilter('not-started')}
          >Не начато</button>
          <button
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >В процессе</button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >Завершено</button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>
      </header>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomNext={chooseRandomNext}
        technologies={technologies}
      />

      <main className="layout">
        <section className="block">
          {filteredTechnologies.map((tech) => (
            <div key={tech.id} className="tech-with-notes">
              <TechnologyCard
                title={tech.title}
                description={tech.description}
                status={tech.status}
                onStatusChange={() => {
                  const nextStatus =
                    tech.status === 'not-started'
                      ? 'in-progress'
                      : tech.status === 'in-progress'
                      ? 'completed'
                      : 'not-started';
                  updateStatus(tech.id, nextStatus);
                }}
              />
              <TechnologyNotes
                notes={tech.notes}
                techId={tech.id}
                onNotesChange={updateNotes}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;
