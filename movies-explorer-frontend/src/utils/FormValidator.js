class FormValidator {
  constructor(objSelectors, formElement) {
    this._objSelectors = objSelectors;
    this._formElement = formElement;
    this._initialValues = {};
  }

  enableValidation = (currentUser) => {
    this._setEventListeners(currentUser);
  }

  _inputCallback = (evt) => {
    if (evt.target.id === 'name-input') {
      if (evt.target.validity.patternMismatch) {
        evt.target.setCustomValidity("Используйте кириллицу, латиницу, пробел и дефис.");
      } else {
        evt.target.setCustomValidity("");
      }
    }
    this._checkInputValidity(evt.target);
    this._toggleButtonState(evt.target);
  }

  _setEventListeners = (currentUser) => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objSelectors['inputSelector']));
    this._buttonElement = this._formElement.querySelector(this._objSelectors['submitButtonSelector']);
    this._inputList.forEach((inputElement) => {
      if (this._formElement.id === 'profile') {
        this._initialValues[inputElement.id] = currentUser[inputElement.name];
      }
      inputElement.addEventListener('input', this._inputCallback);
    });
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState = (inputElement) => {
    if (this._hasInvalidInput(inputElement)) {
      this._disableSubmitButton();
    } else {
      this._ableSubmitButton();
    }
  }

  _hasInvalidInput = (inputElement) => {
    if (this._formElement.id === 'profile') {
      return (inputElement.validity.valid === false || this._initialValues[inputElement.id] === inputElement.value);
    } else {
      return this._inputList.some((inputElement) => {
        return (inputElement.validity.valid === false);
      });
    }
  }

  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._objSelectors['inactiveButtonClass']);
    this._buttonElement.setAttribute('disabled', true);
  }

  _ableSubmitButton = () => {
    this._buttonElement.classList.remove(this._objSelectors['inactiveButtonClass']);
    this._buttonElement.removeAttribute('disabled', false);
  }

  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objSelectors['inputErrorClass']);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._objSelectors['errorClass']);
  }

  _hideInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objSelectors['inputErrorClass']);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._objSelectors['errorClass']);
  }

  disableValidation = () => {
    this._disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.removeEventListener('input', this._inputCallback);
    });
  }
}

export default FormValidator;