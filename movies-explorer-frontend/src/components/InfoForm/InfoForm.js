import { useRef, useEffect } from 'react';
import FormValidator from '../../utils/FormValidator';

const InfoForm = ({ children, title, onSubmit, submitButtonRef, isAuthError, errorMsg }) => {
  const objSelectors = {
    inputSelector: '.info-form__input',
    submitButtonSelector: '.info-form__save-button',
    inactiveButtonClass: 'info-form__save-button_disabled',
    inputErrorClass: 'info-form__input_type_error',
    errorClass: 'info-form__error-element_visible'
  };
  const currentValidationForm = useRef(null);
  const errorClassName = `info-form__error-message ${isAuthError ? 'info-form__error-message_active' : ''}`;

  useEffect(() => {
    const formValidate = new FormValidator(objSelectors, currentValidationForm.current);
    formValidate.enableValidation();
    return () => {
      formValidate.disableValidation();
    }
  }, []);


  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form className="info-form" onSubmit={handleSubmit} ref={currentValidationForm} noValidate>
      <fieldset className="info-form__data">
        {children}
      </fieldset>
      <span className={errorClassName}>{errorMsg}</span>
      <button ref={submitButtonRef} className='info-form__save-button info-form__save-button_disabled' type="submit" aria-label="Кнопка отправки формы" disabled={true}>{title}</button>
    </form>
  );
}

export default InfoForm;