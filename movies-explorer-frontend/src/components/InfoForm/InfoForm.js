import { useRef, useEffect } from 'react';
import FormValidator from '../../utils/FormValidator';
import { objSelectors_InfoForm } from '../../utils/Consts';

const InfoForm = ({ children, title, onSubmit, submitButtonRef, isAuthError, errorMsg }) => {
  const currentValidationForm = useRef(null);
  const errorClassName = `info-form__error-message ${isAuthError ? 'info-form__error-message_active' : ''}`;

  useEffect(() => {
    const formValidate = new FormValidator(objSelectors_InfoForm, currentValidationForm.current);
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