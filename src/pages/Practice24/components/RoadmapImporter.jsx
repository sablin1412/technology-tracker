import { useState } from 'react';

function RoadmapImporter({ onImport }) {
  const [importing, setImporting] = useState(false);

  const handleImportRoadmap = async (roadmapUrl) => {
    try {
      setImporting(true);

      // имитация запроса дорожной карты из API
      await new Promise((resolve) => setTimeout(resolve, 700));

      const roadmapData = {
        technologies: [
          {
            title: 'Next.js',
            description: 'Фреймворк для React с рендерингом на сервере',
            category: 'frontend',
            difficulty: 'intermediate',
          },
          {
            title: 'PostgreSQL',
            description: 'Реляционная база данных',
            category: 'database',
            difficulty: 'intermediate',
          },
        ],
      };

      for (const tech of roadmapData.technologies) {
        await onImport(tech);
      }

      alert(`Импортировано ${roadmapData.technologies.length} технологий`);
    } catch (e) {
      alert('Ошибка импорта дорожной карты');
    } finally {
      setImporting(false);
    }
  };

  const handleExampleImport = () => {
    handleImportRoadmap('https://api.example.com/roadmaps/frontend');
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <button
        onClick={handleExampleImport}
        disabled={importing}
        className="import-button"
      >
        {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
      </button>
    </div>
  );
}

export default RoadmapImporter;
