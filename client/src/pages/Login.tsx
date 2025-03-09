import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/board');
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!loginData.username || !loginData.password) {
      setError('Please enter both username and password.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Call login function but don't assign the result to an unused variable
      await login(loginData);
      // The Auth.login function in authAPI already handles redirecting
    } catch (err) {
      console.error('Failed to login', err);
      setError(err instanceof Error ? err.message : 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold text-center'>Kanban Board Login</h1>
          
          {error && (
            <div className='p-3 text-sm text-red-700 bg-red-100 rounded-lg' role='alert'>
              {error}
            </div>
          )}
          
          <div>
            <label className='block mb-1 font-medium'>Username</label>
            <input 
              type='text'
              name='username'
              value={loginData.username || ''}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your username'
            />
          </div>
          
          <div>
            <label className='block mb-1 font-medium'>Password</label>
            <input 
              type='password'
              name='password'
              value={loginData.password || ''}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your password'
            />
          </div>
          
          <button 
            type='submit'
            disabled={isLoading}
            className='w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300'
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;