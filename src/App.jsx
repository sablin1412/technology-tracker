import { useState } from 'react';
import './App.css';
import TechnologyCard from './TechnologyCard';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'completed'
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started'
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состояниями компонентов',
    status: 'not-started'
  }
];

function App() {
  const [techList, setTechList] = useState(initialTechnologies);
  const [filter, setFilter] = useState('all'); // all | not-started | in-progress | completed

  const total = techList.length;
  const completedCount = techList.filter(t => t.status === 'completed').length;
  const notStarted = techList.filter(t => t.status === 'not-started').length;
  const inProgress = techList.filter(t => t.status === 'in-progress').length;
  const progressPercent = Math.round((completedCount / total) * 100);

  // смена статуса по клику по карточке
  const toggleStatus = (id) => {
    setTechList(prev =>
      prev.map(t => {
        if (t.id !== id) return t;

        let nextStatus;
        if (t.status === 'not-started') nextStatus = 'in-progress';
        else if (t.status === 'in-progress') nextStatus = 'completed';
        else nextStatus = 'not-started';

        return { ...t, status: nextStatus };
      })
    );
  };

  // фильтрация списка
  const filteredTechs =
    filter === 'all'
      ? techList
      : techList.filter(t => t.status === filter);

  return (
    <div className="App">
      {/* Прогресс */}
      <header className="progress-header-big">
        <h2>Прогресс изучения</h2>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Всего технологий</span>
            <span className="stat-value">{total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Изучено</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Не начато</span>
            <span className="stat-value">{notStarted}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">В процессе</span>
            <span className="stat-value">{inProgress}</span>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-bar-text">{progressPercent}% завершено</div>
      </header>

      {/* Кнопки фильтра */}
      <section className="quick-actions block">
        <div className="filters-row">
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
      </section>

      {/* Список технологий */}
      <main className="layout">
        <section className="block">
          {filteredTechs.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={() => toggleStatus(tech.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
