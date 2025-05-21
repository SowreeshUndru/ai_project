import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext';

function Register() {
  const {setUser}=useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
   
    axiosInstance.post('/users/register', { email, password })
    .then(function(response) {
      console.log(response.data);
      setUser(response.data);
      localStorage.setItem('token', (response.token));
      navigate('/');
    })
    .catch(function(error) {
      console.log(error); });
  };

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
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
          <Link to="/login" className="text-purple-400 hover:underline">Already have an account? Login</Link>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;