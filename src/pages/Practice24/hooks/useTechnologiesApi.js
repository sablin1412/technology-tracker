import { useEffect, useState } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [resourcesLoadingId, setResourcesLoadingId] = useState(null);
  const [resourcesErrorId, setResourcesErrorId] = useState(null);

  // имитация загрузки с API при старте
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev'],
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org'],
        },
        {
          id: 3,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org'],
        },
      ];

      setTechnologies(mockTechnologies);
    } catch (e) {
      setError('Не удалось загрузить технологии');
    } finally {
      setLoading(false);
    }
  };

  // добавление технологий из дорожной карты
  const addTechnology = async (techData) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newTech = {
      id: Date.now() + Math.random(),
      resources: [],
      ...techData,
    };

    setTechnologies((prev) => [...prev, newTech]);
    return newTech;
  };

  // загрузка дополнительных ресурсов для одной технологии
  const loadTechnologyResources = async (techId) => {
    try {
      setResourcesLoadingId(techId);
      setResourcesErrorId(null);

      await new Promise((resolve) => setTimeout(resolve, 700));

      const extraResources = [
        `https://example.com/docs/${techId}`,
        `https://example.com/tutorials/${techId}`,
      ];

      setTechnologies((prev) =>
        prev.map((t) =>
          t.id === techId
            ? { ...t, resources: [...(t.resources || []), ...extraResources] }
            : t
        )
      );
    } catch (e) {
      setResourcesErrorId(techId);
    } finally {
      setResourcesLoadingId(null);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    resourcesLoadingId,
    resourcesErrorId,
    loadTechnologyResources,
  };
}

export default useTechnologiesApi;
