function TechnologyList({
  technologies = [],
  search = '',
  onLoadResources,
  resourcesLoadingId,
  resourcesErrorId,
}) {
  const normalized = search.trim().toLowerCase();

  const filtered = !normalized
    ? technologies
    : technologies.filter((tech) =>
        tech.title.toLowerCase().includes(normalized) ||
        tech.description.toLowerCase().includes(normalized)
      );

  if (!filtered.length) {
    return <p>Технологии не найдены.</p>;
  }

  return (
    <div className="technology-list">
      {filtered.map((tech) => (
        <div key={tech.id} className="technology-card">
          <h3>{tech.title}</h3>
          <p>{tech.description}</p>
          <p>
            Категория: {tech.category}, уровень: {tech.difficulty}
          </p>

          <button
            onClick={() => onLoadResources(tech.id)}
            disabled={resourcesLoadingId === tech.id}
          >
            {resourcesLoadingId === tech.id
              ? 'Загрузка ресурсов...'
              : 'Загрузить дополнительные ресурсы'}
          </button>

          {resourcesErrorId === tech.id && (
            <p className="error-text">Не удалось загрузить ресурсы</p>
          )}

          {tech.resources && tech.resources.length > 0 && (
            <ul className="resources-list">
              {tech.resources.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default TechnologyList;
