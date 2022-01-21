import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoForm from '../InfoForm/InfoForm';

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="register">
      <div className="register__top">
        <Link to="/" className="register__logo" />
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
        <InfoForm title={'Зарегистрироваться'}>
          <div className="register__inputs">
            <label className="info-form__label" htmlFor="name-input">
              Имя
            </label>
            <input id="name-input" className="info-form__input" type="text" value={name} onChange={handleNameChange} placeholder="Ваше имя" name="name" required minLength="2" maxLength="30" />
            <span className="info-form__error-element name-input-error"></span>
            <label className="info-form__label" htmlFor="email-input">
              E-mail
            </label>
            <input id="email-input" className="info-form__input" type="email" value={email} onChange={handleEmailChange} placeholder="Ваш E-mail" name="email" required />
            <span className="info-form__error-element email-input-error"></span>
            <label className="info-form__label" htmlFor="password-input">
              Пароль
            </label>
            <input id="password-input" className="info-form__input" type="password" value={password} onChange={handlePasswordChange} placeholder="Ваш пароль" name="password" required minLength="6" />
            <span className="info-form__error-element password-input-error"></span>
          </div>
        </InfoForm>
      <span className="info-form__login-wrapper">Уже зарегистрированы?
        <Link to="/signin" className="info-form__login-link">Войти</Link>
      </span>
    </section>
  );
}

export default Register;
