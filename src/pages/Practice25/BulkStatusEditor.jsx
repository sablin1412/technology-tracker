import { useState } from 'react';

function BulkStatusEditor({ technologies, onBulkUpdate }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState('planned');

  const allIds = technologies.map((t) => t.id);
  const allSelected = selectedIds.length === allIds.length && allIds.length > 0;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    selectedIds.forEach((id) => onBulkUpdate(id, status));
  };

  return (
    <div className="bulk-status-editor">
      <div className="bulk-controls">
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
          />
          Выбрать все
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Новый статус для выбранных технологий"
        >
          <option value="not-started">Не начато</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Завершено</option>
        </select>

        <button
          type="button"
          onClick={handleApply}
          disabled={selectedIds.length === 0}
        >
          Применить ко всем выбранным
        </button>
      </div>

      <ul className="bulk-list">
        {technologies.map((tech) => (
          <li key={tech.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(tech.id)}
                onChange={() => toggleOne(tech.id)}
              />
              <span>
                {tech.title} — текущий статус: {tech.status}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BulkStatusEditor;
