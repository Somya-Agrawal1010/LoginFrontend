import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
const navigate = useNavigate
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if(errors.name === '' && errors.email === '' && errors.password === ''){
      axios.post('http://localhost:8081/login' , values)
      .then(res => {
        navigate('/homepage')
      })
      .catch(err => console.log(err))
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center  vh-100'>
        <div className='bg-white p-3 rounded w-25 shadow-sm'>
          <form onSubmit={handleSubmit}>
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
              {errors.email && <span className='text-danger'>{errors.email}</span>}
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
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100'>
              Log in
            </button>
            <p className='mb-3 p-2'>You are agreeing to our terms and conditions</p>
            <NavLink to='/signup' className='btn btn-primary w-100'>
              Create Account
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;



