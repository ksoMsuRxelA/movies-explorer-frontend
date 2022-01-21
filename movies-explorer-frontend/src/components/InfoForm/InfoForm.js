import { useRef, useEffect } from 'react';
import FormValidator from '../../utils/FormValidator';

const InfoForm = ({ children, title }) => {
  const objSelectors = {
    inputSelector: '.info-form__input',
    submitButtonSelector: '.info-form__save-button',
    inactiveButtonClass: 'info-form__save-button_disabled',
    inputErrorClass: 'info-form__input_type_error',
    errorClass: 'info-form__error-element_visible'
  };

  const currentValidationForm = useRef(null);

  useEffect(() => {
    const formValidate = new FormValidator(objSelectors, currentValidationForm.current);
    formValidate.enableValidation();
    return () => {
      formValidate.disableValidation();
    }
  }, []);

  return (
    <form className="info-form" onSubmit={() => {}} ref={currentValidationForm} noValidate>
      <fieldset className="info-form__data">
        {children}
      </fieldset>
      <button className="info-form__save-button info-form__save-button_disabled" type="submit" aria-label="Кнопка отправки формы" disabled>{title}</button>
    </form>
  );
}

export default InfoForm;