import { useState } from 'react';

function DataImportExport({ technologies, onImport }) {
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies));
      setStatus('Данные сохранены в localStorage.');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Ошибка при сохранении в localStorage.');
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('technologies');
      if (!saved) {
        setStatus('В localStorage нет сохранённых данных.');
        return;
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        setStatus('Данные в localStorage повреждены.');
        return;
      }
      onImport(parsed);
      setStatus(`Загружено технологий: ${parsed.length}.`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Ошибка при загрузке из localStorage.');
    }
  };

  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies-${new Date()
        .toISOString()
        .split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('Экспорт успешен.');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Ошибка при экспорте в JSON.');
    }
  };

  const importFromJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) {
          throw new Error('Ожидался массив технологий.');
        }
        onImport(imported);
        setStatus(`Импортировано технологий: ${imported.length}.`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        console.error(error);
        setStatus('Файл имеет неверный формат или некорректные данные.');
      }
    };
    reader.readAsText(file);
    // сбрасываем value, чтобы можно было выбирать тот же файл ещё раз
    event.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || file.type !== 'application/json') {
      setStatus('Поддерживаются только JSON-файлы.');
      return;
    }
    const fakeEvent = { target: { files: [file], value: '' } };
    importFromJSON(fakeEvent);
  };

  return (
    <div className="data-import-export">
      <div
        className="status-message"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </div>

      <div className="controls">
        <button
          type="button"
          onClick={exportToJSON}
          disabled={technologies.length === 0}
        >
          Экспортировать в JSON
        </button>

        <label className="file-input-label">
          Импортировать из JSON
          <input
            type="file"
            accept=".json,application/json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
          />
        </label>

        <button
          type="button"
          onClick={saveToLocalStorage}
          disabled={technologies.length === 0}
        >
          Сохранить в localStorage
        </button>

        <button type="button" onClick={loadFromLocalStorage}>
          Загрузить из localStorage
        </button>
      </div>

      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Перетащи сюда JSON-файл для импорта
      </div>
    </div>
  );
}

export default DataImportExport;
