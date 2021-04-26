import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';

import { startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = ({history}) => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui )
  const { uid } = useSelector(state => state.auth )

  if ( uid ) {
    history.replace('/')
  }

  const [formValues, handleInputChange] = useForm({
    email: 'alguncorreovalido',
    password: '123456'
  });

  const { email, password } = formValues

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword(email,password));
  }

  // const handleGoogleLogin = (e) => {
  //   dispatch(startGoogleLogin())
  // }

  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body animate__animated animate__fadeIn">
          <div className="container is-fluid">
            <h1 className="title">
              Login
            </h1>
          </div>
        </div>
      </section>

      <form 
        onSubmit={ handleLogin }
        className="box animate__animated animate__fadeIn animate__faster fill-height"
      >
          <hr />   
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                className="input" 
                type="email" 
                placeholder="Escribe tu email"
                name="email"
                value={email}
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input 
                className="input" 
                type="password" 
                placeholder="Escribe tu contreseña" 
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>

        <button
          type="submit"
          className="button is-info is-fullwidth mt-5"
          disabled={loading}
        >
          Login
        </button>

        {/* <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div 
              className="google-btn"
              onClick={handleGoogleLogin}
          >
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
          </div>
        </div> */}
      </form>
    </>
  )
}
