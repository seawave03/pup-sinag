import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SignUpPage = () => {
  const { role } = useParams();
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-200'>
        <div className='min-w-[500px] bg-white p-14 rounded-lg shadow-md text-center'>
          <h1 className='text-2xl font-bold mb-4 text-red-900 mb-10'>Sign Up {role}</h1>
          <form>
            <div className='flex flex-col items-center justify-center gap-5'>
              <input type='text' placeholder='First Name' className='w-full p-2 rounded-md border-2 border-red-900' />
              <input type='text' placeholder='Last Name' className='w-full p-2 rounded-md border-2 border-red-900   ' />
              <input type='email' placeholder='Email' className='w-full p-2 rounded-md border-2 border-red-900' />
              <input type='password' placeholder='Password' className='w-full p-2 rounded-md border-2 border-red-900' />
              <input
                type='password'
                placeholder='Confirm Password'
                className='w-full p-2 rounded-md border-2 border-red-900'
              />
              <button type='submit' className='w-full bg-red-900 text-white p-2 rounded-md'>
                Sign Up
              </button>
              <p className='text-sm text-gray-500'>
                Already have an account?{' '}
                <Link to='/login' className='text-red-900 font-bold'>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
