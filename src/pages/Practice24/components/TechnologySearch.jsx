import { useEffect, useState } from 'react';

function TechnologySearch({ onSearch }) {
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState('');

  // debounce: ждём 400 мс перед обновлением debounced
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), 400);
    return () => clearTimeout(id); // отмена предыдущего "запроса"
  }, [value]);

  // передаём родителю уже "задебаунсенное" значение
  useEffect(() => {
    onSearch(debounced.trim().toLowerCase());
  }, [debounced, onSearch]);

  return (
    <div className="technology-search">
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TechnologySearch;
