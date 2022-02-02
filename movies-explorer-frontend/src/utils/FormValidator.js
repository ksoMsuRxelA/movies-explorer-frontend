class FormValidator {
  constructor(objSelectors, formElement) {
    this._objSelectors = objSelectors;
    this._formElement = formElement;
    this._regExp = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/uig;
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  _inputCallback = (inputElement) => {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objSelectors['inputSelector']));
    this._buttonElement = this._formElement.querySelector(this._objSelectors['submitButtonSelector']);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity = (inputElement) => {
    // if (inputElement.name === 'name') {
    //   if (!(inputElement.validity.valid && this._regExp.test(inputElement.value))) {
    //     console.log(this._regExp.test(inputElement.value));
    //     this._showInputError(inputElement, inputElement.validationMessage);
    //     // setTimeout(this._showInputError, 0, inputElement, inputElement.validationMessage);
    //   } else {
    //     this._hideInputError(inputElement);
    //     // setTimeout(this._hideInputError, 0, inputElement);
    //   }
    // } else
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._ableSubmitButton();
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      // if (input.name === 'name') {
      //   return input.validity.valid === false || this._regExp.test(input.value);
      // }
      return input.validity.valid === false;
    }) || this._inputList.some((input) => {
      return input.value === '';
    });
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
    // if (inputElement.name === 'name' && !this._regExp.test(inputElement.value)) {
    //   console.log(`_showInputError: ${inputElement.name === 'name' && !this._regExp.test(inputElement.value)}.`);
    //   this._errorElement.textContent = 'Невалидное значение поля имени...';
    // } else {
    //   this._errorElement.textContent = errorMessage;
    // }
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