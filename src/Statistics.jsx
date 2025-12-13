// pages/Statistics.jsx
import useTechnologies from './useTechnologies';
import ProgressBar from "./ProgressBar.jsx";


function Statistics() {
  const { technologies, progress } = useTechnologies();

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  const percentCompleted = total ? Math.round((completed / total) * 100) : 0;
  const percentInProgress = total ? Math.round((inProgress / total) * 100) : 0;
  const percentNotStarted = total ? Math.round((notStarted / total) * 100) : 0;

  return (
    <div className="page">
      <h2>Статистика</h2>
      <p>Общий прогресс: {progress}%</p>

      <div style={{ maxWidth: 600, margin: '20px auto' }}>
        <ProgressBar
          progress={progress}
          label="Все технологии"
          color="#22c55e"
          height={18}
          animated={true}
        />
        <ProgressBar
          progress={percentCompleted}
          label="Завершено"
          color="#16a34a"
          height={14}
          animated={true}
        />
        <ProgressBar
          progress={percentInProgress}
          label="В процессе"
          color="#2563eb"
          height={14}
          animated={true}
        />
        <ProgressBar
          progress={percentNotStarted}
          label="Не начато"
          color="#f97316"
          height={14}
          animated={true}
        />
      </div>
    </div>
  );
}

export default Statistics;
