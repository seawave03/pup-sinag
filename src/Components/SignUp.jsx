import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import v from 'voca';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/pup-sinag');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
      <form onSubmit={handleSubmit}>
        <div className='bg-white min-w-[500px] p-8 rounded-xl shadow-xl w-full max-w-md mt-10 mb-20'>
          <h1 className='text-2xl font-bold text-red-900 mb-6 text-center'> Sign Up for {v.titleCase(role)}</h1>
          <div className='flex flex-col items-center justify-center gap-4 '>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
              className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900'
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
              className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900'
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
              className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900'
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
              className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900'
            />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-900'
            />
            <button
              type='submit'
              className='w-full bg-red-900 text-white text-center py-4 px-6 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword
              }
            >
              Register Account
            </button>
          </div>
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <button onClick={() => navigate(`/pup-sinag`)} className='text-red-900 font-semibold hover:underline'>
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
