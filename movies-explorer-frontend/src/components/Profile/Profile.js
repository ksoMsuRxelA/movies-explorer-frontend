import { useState, useContext, useRef, useEffect } from 'react';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import PopupError from '../PopupError/PopupError';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormValidator from '../../utils/FormValidator';
import { objSelectors_Profile } from '../../utils/Consts';

const Profile = ({ loggedIn, onPatchProfile, isAuthError, errorMsg, setIsAuthError, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);
  const [ userName, setUserName ] = useState(currentUser.name);
  const [ userEmail, setUserEmail ] = useState(currentUser.email);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const validatingForm = useRef(null);
  const submitButtonRef = useRef(null);
  const errorClassName = `profile__error-message ${isAuthError ? 'profile__error-message_active' : ''}`;

  useEffect(() => {
    const formValidation= new FormValidator(objSelectors_Profile, validatingForm.current);
    formValidation.enableValidation(currentUser);
    return () => {
      formValidation.disableValidation();
    }
  }, [currentUser]);

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
    setIsAuthError(false);
  }

  function handleNameChange(evt) {
    setUserName(evt.target.value);
    setIsAuthError(false);
  }

  function handleEmailChange(evt) {
    setUserEmail(evt.target.value);
    setIsAuthError(false);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    onPatchProfile({
      name: userName,
      email: userEmail === currentUser.email ? ' ' : userEmail,
    }, submitButtonRef, setUserEmail, setUserName, setPopupIsOpen);
  }

  function handleLogout() {
    onLogout();
  }

  return (
    <section className="profile">
      <Header isLoggedIn={loggedIn} onBurgerBtnClick={ handleBurgerClick }/>
      <BurgerMenu isBurgerActive={ isBurgerActive } onCloseBurgerBtnClick={ handleBurgerClick } />
      <div className="profile__content">
        <h2 className="profile__title">{`????????????, ${currentUser.name}!`}</h2>
        <form ref={validatingForm} className="profile__form" id="profile" name="profile" onSubmit={ handleProfileFormSubmit } noValidate>
          <fieldset className="profile__info">
            <div className="profile__input-wrapper">
              <span className="profile__input-tag">??????</span>
              <input className="profile__input" id="name-input" type="text" value={ userName } onChange={ handleNameChange } placeholder="???????? ??????" name="name" required minLength="2" maxLength="40" pattern="^[A-Za-z??-????-??\s-]{1,}$" />
            </div>
            <span className="profile__error-element name-input-error"></span>
            <div className="profile__input-wrapper">
              <span className="profile__input-tag">E-mail</span>
              <input className="profile__input" id="email-input" type="email" value={ userEmail } onChange={ handleEmailChange } placeholder="?????? E-mail" name="email" pattern="^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]+$" required minLength="2" maxLength="40" />
            </div>
            <span className="profile__error-element email-input-error"></span>
          </fieldset>
          <div className="profile__submit-section">
            <span className={errorClassName}>{errorMsg}</span>
            <button ref={submitButtonRef} className="profile__save-button profile__save-button_disabled" type="submit" aria-label="???????????????? ??????????????" disabled={true}>??????????????????????????</button>
          </div>
        </form>
        <button className="profile__logout-button" type="button" aria-label="?????????? ???? ?????????????? ????????????" onClick={handleLogout}>?????????? ???? ????????????????</button>
      </div>
      <PopupError isOpen={popupIsOpen} message={'???????? ???????????? ?????????????? ??????????????????'} onClose={() => {setPopupIsOpen(false)}} />
    </section>
  );
}

export default Profile;
