// pages/Dashboard.jsx
import useTechnologies from './useTechnologies.js';


function Dashboard() {
  const { technologies, progress } = useTechnologies();

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Всего технологий: {technologies.length}</p>
      <p>Общий прогресс: {progress}%</p>
    </div>
  );
}

export default Dashboard;
