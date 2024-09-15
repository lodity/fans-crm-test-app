import { useEffect, useState } from 'react';
import httpClient from '../api/httpClient';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<number>(1);
  const [getUserData, setGetUserData] = useState<any>(null);
  const { token } = useUser();
  const navigate = useNavigate();

  const handleGetUser = async () => {
    try {
      // Делаем GET-запрос к защищенному маршруту
      const response = await httpClient.get(`/users/get-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGetUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Делаем GET-запрос к защищенному маршруту
    httpClient
      .get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [token]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {userData ? (
        <div>
          <h1>Welcome!</h1>
          <p>You are logged in</p>
        </div>
      ) : (
        <p>Log in to continue</p>
      )}
      {userData && (
        <>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(+e.target.value)}
          />
          <button
            onClick={() => {
              handleGetUser();
            }}
          >
            Get user by id
          </button>
          {getUserData !== null && (
            <textarea
              readOnly
              rows={10}
              cols={40}
              value={JSON.stringify(getUserData, null, 2)}
            />
          )}
        </>
      )}
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        Go to login
      </button>
    </div>
  );
};

export default User;
