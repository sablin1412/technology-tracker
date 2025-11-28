import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    'techTrackerData',
    initialTechnologies
  );

  const updateStatus = (techId, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const calculateProgress = () => {
    if (!technologies || technologies.length === 0) return 0;
    const completed = technologies.filter(
      (tech) => tech.status === 'completed'
    ).length;
    return Math.round((completed / technologies.length) * 100);
  };

  const progress = calculateProgress();

  return { technologies, updateStatus, updateNotes, progress, setTechnologies };
}

export default useTechnologies;
