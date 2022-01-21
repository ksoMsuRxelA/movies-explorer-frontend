import { useState } from 'react';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Profile = ({ name, email }) => {
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);
  const [ userName, setUserName ] = useState(name);
  const [ userEmail, setUserEmail ] = useState(email);

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  function handleNameChange(evt) {
    setUserName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setUserEmail(evt.target.value);
  }

  function handleProfilFormSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="profile">
      <Header inMain={false} onBurgerBtnClick={ handleBurgerClick }/>
      <BurgerMenu isBurgerActive={ isBurgerActive } onCloseBurgerBtnClick={ handleBurgerClick } />
      <div className="profile__content">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <form className="profile__form" name="profile" onSubmit={ handleProfilFormSubmit }>
          <fieldset className="profile__info">
            <div className="profile__input-wrapper">
              <span className="profile__input-tag">Имя</span>
              <input className="profile__input" id="name-input" type="text" value={ userName } onChange={ handleNameChange } placeholder="Ваше имя" name="name" required minLength="2" maxLength="40" />
            </div>
            <div className="profile__input-wrapper">
              <span className="profile__input-tag">E-mail</span>
              <input className="profile__input" id="name-input" type="text" value={ userEmail } onChange={ handleEmailChange } placeholder="Ваш E-mail" name="name" required minLength="2" maxLength="40" />
            </div>
          </fieldset>
          <button className="profile__save-button" type="submit" aria-label="Изменить профиль" disabled={true}>Редактировать</button>
        </form>
        <button className="profile__logout-button" type="button" aria-label="Выйти из учетной записи" onClick={() => {}}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
