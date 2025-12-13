// src/useTechnologies.js
import useLocalStorage from './pages/FullTracker/useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes:
      'Разобраться с функциональными и классовыми компонентами.\n' +
      'Настроить передачу пропсов и дефолтные значения.\n' +
      'Попрактиковаться в разбиении интерфейса на мелкие компоненты.',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes:
      'Повторить правила вставки JS в JSX ({}).\n' +
      'Запомнить ограничения: один корневой элемент, className, htmlFor и т.п.\n' +
      'Написать несколько небольших компонентов только на JSX.',
    category: 'frontend'
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов',
    status: 'not-started',
    notes:
      'Освоить useState и обновление состояния на основе предыдущего значения.\n' +
      'Потренироваться поднимать состояние выше по дереву компонентов.\n' +
      'Решить, где лучше хранить состояние: локально или в общем родителе.',
    category: 'frontend'
  }
  // добавь сюда остальные технологии по аналогии, если они у тебя есть
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
