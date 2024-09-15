import { useState, FC } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import httpClient from '../api/httpClient';

const Login: FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const { login, logout } = useUser();
  const navigate = useNavigate();

  // Обработка изменения полей
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Функция для регистрации
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправляем запрос на сервер для регистрации
    httpClient
      .post('/users/add-user', registerData)
      .then(async (registerResponse) => {
        console.log('User registered:', registerResponse.data);
        const loginResponse = await axios.post(
          'http://localhost:3000/auth/login',
          {
            name: loginData.name,
            password: loginData.password,
          },
        );
        const { access_token } = loginResponse.data;
        login({ name: loginData.name }, access_token);
        setIsRegistering(false);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        name: loginData.name,
        password: loginData.password,
      });
      const { access_token } = response.data;
      login({ name: loginData.name }, access_token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isRegistering ? (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <button type="submit">Register</button>
            <button type="button" onClick={() => setIsRegistering(false)}>
              Back to Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Name:</label>
              <input
                type="name"
                name="name"
                value={loginData.name}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button type="button" onClick={() => setIsRegistering(true)}>
            Register
          </button>
        </div>
      )}
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigate('/user');
        }}
      >
        Go to user
      </button>
    </div>
  );
};

export default Login;
