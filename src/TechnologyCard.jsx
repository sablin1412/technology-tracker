function TechnologyCard({ title, description, status, onStatusChange }) {
  const statusText =
    status === 'completed'
      ? 'Завершено'
      : status === 'in-progress'
      ? 'В процессе'
      : 'Не начато';

  return (
    <div
      className={`technology-card status-${status}`}
      onClick={onStatusChange}
    >
      <h3>{title}</h3>
      <p className="tech-desc">{description}</p>
      <p className="tech-status">
        Статус: <span>{statusText}</span>
      </p>
    </div>
  );
}

export default TechnologyCard;
