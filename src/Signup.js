import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((val) => val === '')) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          console.log('Signup Successful');
          
        })
        .catch(err => console.log(err));
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25 shadow-sm '>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                placeholder='Enter Your Name'
                name='name'
                value={values.name}
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.name && <p className='text-danger'>{errors.name}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={values.email}
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.email && <p className='text-danger'>{errors.email}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={values.password}
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <p className='text-danger'>{errors.password}</p>}
            </div>
            <button type='submit' className='btn btn-success w-100'>
              Sign Up
            </button>
            <p className='text-align-center'>You Are agree to our terms and policy</p>
            <NavLink to='/' className='btn btn-default border w-100'>
              Log In
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

