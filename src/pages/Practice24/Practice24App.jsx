import { useState } from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import RoadmapImporter from './components/RoadmapImporter';
import TechnologySearch from './components/TechnologySearch';
import TechnologyList from './components/TechnologyList';

function Practice24App() {
  const {
    technologies,
    loading,
    error,
    refetch,
    addTechnology,
    resourcesLoadingId,
    resourcesErrorId,
    loadTechnologyResources,
  } = useTechnologiesApi();

  const [search, setSearch] = useState('');

  if (loading) {
    return (
      <div className="app-loading">
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Практика 24: трекер технологий</h1>
        <button onClick={refetch} className="refresh-btn">
          Обновить
        </button>
      </header>

      {error && (
        <div className="app-error">
          <p>{error}</p>
          <button onClick={refetch}>Попробовать снова</button>
        </div>
      )}

      <main className="app-main">
        <RoadmapImporter onImport={addTechnology} />
        <TechnologySearch onSearch={setSearch} />
        <TechnologyList
          technologies={technologies}
          search={search}
          onLoadResources={loadTechnologyResources}
          resourcesLoadingId={resourcesLoadingId}
          resourcesErrorId={resourcesErrorId}
        />
      </main>
    </div>
  );
}

export default Practice24App;
