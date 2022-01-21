import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoForm from '../InfoForm/InfoForm';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="login">
      <div className="login__top">
        <Link to="/" className="login__logo" />
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <InfoForm title={'Войти'}>
        <div className="login__inputs">
          <label className="info-form__label" htmlFor="email-input">
            E-mail
          </label>
          <input id="email-input" className="info-form__input" type="email" value={email} onChange={handleEmailChange} placeholder="Ваш email" name="email" required />
          <span className="info-form__error-element email-input-error"></span>
          <label className="info-form__label" htmlFor="password-input">
            Пароль
          </label>
          <input id="password-input" className="info-form__input" type="password" value={password} onChange={handlePasswordChange} placeholder="Ваш пароль" name="password" required />
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
