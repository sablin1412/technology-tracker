// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password.trim()) {
      onLogin(username);
      navigate('/dashboard');
    } else {
      alert('Неверный логин или пароль. Используйте admin + любой пароль.');
    }
  };

  return (
    <div className="page">
      <h2>Вход</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
