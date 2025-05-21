import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axios.js'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Usercontext.jsx';

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmessage, setError] = useState(null);


  const handleSubmit = (e) => {


    e.preventDefault();
    axiosInstance.post('/users/login', { email, password })
      .then(function (response) {

        console.log(response);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setUser(response.data.find);
        localStorage.setItem('token', (response.data.token));
        navigate('/');

      })
      .catch(function (error) { console.log(error); });

  };

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className='fixed z-999 text-[#F45B5D] ml-7'>{errmessage}</div>
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Link to="/register" className="text-purple-400 hover:underline">Don't have an account? Register</Link>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;