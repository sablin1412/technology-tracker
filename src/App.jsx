import { useState } from 'react';
import './App.css';
import useTechnologies from './useTechnologies';
import TechnologyCard from './TechnologyCard';
import TechnologyNotes from './TechnologyNotes';
import ProgressBar from './ProgressBar';
import QuickActions from './QuickActions';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    progress,
    setTechnologies
  } = useTechnologies();

  // фильтр по статусу и строка поиска
  const [filter, setFilter] = useState('all');      // all | not-started | in-progress | completed
  const [searchQuery, setSearchQuery] = useState(''); // поиск по названию и описанию

  const markAllCompleted = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: 'not-started' }))
    );
  };

  // сначала фильтруем по статусу
  const filteredByStatus =
    filter === 'all'
      ? technologies
      : technologies.filter((tech) => tech.status === filter);

  // затем по поиску (название + описание)
  const filteredTechnologies = filteredByStatus.filter((tech) =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="progress-header-big">
        <h2>Прогресс изучения</h2>

        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#22c55e"
          height={18}
          animated={true}
        />

        {/* Фильтры по статусу */}
        <div className="filters-row center-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            className={filter === 'not-started' ? 'active' : ''}
            onClick={() => setFilter('not-started')}
          >
            Не начато
          </button>
          <button
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >
            В процессе
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Завершено
          </button>
        </div>

        {/* Поиск по технологиям */}
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

export default App;
