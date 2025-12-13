// pages/Settings.jsx
function Settings({ theme, setTheme }) {
  return (
    <div className="page">
      <h2>Настройки</h2>

      <div className="setting-item">
        <h3>Тема</h3>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
          <option value="auto">Авто</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
