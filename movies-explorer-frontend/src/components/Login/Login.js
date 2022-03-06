import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoForm from '../InfoForm/InfoForm';

const Login = ({ onLogin, isAuthError, errorMsg, setIsAuthError }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const submitButtonRef = useRef();

  useEffect(() => {
    setIsAuthError(false);
  }, []);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    setIsAuthError(false);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    setIsAuthError(false);
  }

  function handleLogin () {
    onLogin(email, password, submitButtonRef);
    setEmail('');
    setPassword('');
  }

  return (
    <section className="login">
      <div className="login__top">
        <Link to="/" className="login__logo" />
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <InfoForm
        title={'Войти'}
        onSubmit={handleLogin}
        submitButtonRef={submitButtonRef}
        isAuthError={isAuthError}
        errorMsg={errorMsg}
      >
        <div className="login__inputs">
          <label className="info-form__label" htmlFor="email-input">
            E-mail
          </label>
          <input id="email-input" className="info-form__input" type="email" value={email} onChange={handleEmailChange} placeholder="Ваш email" name="email" pattern="^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]+$" required />
          <span className="info-form__error-element email-input-error"></span>
          <label className="info-form__label" htmlFor="password-input">
            Пароль
          </label>
          <input id="password-input" className="info-form__input" type="password" value={password} onChange={handlePasswordChange} placeholder="Ваш пароль" name="password" minLength="6" required />
          <span className="info-form__error-element password-input-error"></span>
        </div>
      </InfoForm>
      <span className="info-form__login-wrapper">Ещё не зарегистрированы?
        <Link to="/signup" className="info-form__login-link">Регистрация</Link>
      </span>
    </section>
  )
}

export default Login;
