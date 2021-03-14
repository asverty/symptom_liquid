// VALIDATION

// без обязательного чекбокса
class FormValidator {

	constructor(formSelector) {
		this._form = document.querySelector(formSelector);
		this._inputs = Array.from(this._form.querySelectorAll('.input__field'));
		this._submitButton = this._form.querySelector('.submit-button');
		this._inactiveButtonClass = 'black-button_inactive';
		this._invalidInputClass = 'input__field_invalid';
		this._errorVisibleClass = 'input__error_shown';
	}

	enableValidation() {
		this.resetValidation();
		this._inputs.forEach((input) => {
			input.addEventListener('input', () => {
				this._isInputValid(input);
				this._toggleButtonState(this._submitButton);
			});
		});
	}

	resetValidation() {
		this._toggleButtonState(this._submitButton);
		this._inputs.forEach((input) => {
			this._hideError(input);
		});
	}

	_isInputValid(input) {
		if (!input.validity.valid) {
			this._showError(input, input.validationMessage);
		} else {
			this._hideError(input);
		}
	}

	_toggleButtonState() {
		if (!this._hasInvalidInput()) {
			this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
			this._submitButton.style.cursor = 'pointer';
		} else {
			this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', true);
			this._submitButton.style.cursor = 'default';
		}
	}

	_hasInvalidInput() {
		return this._inputs.some((input) => {
			return !input.validity.valid;
		});
	}

	_showError(input, errorMessage) {
		const errorElement = this._form.querySelector(`#${input.id}-error`);
		input.classList.add(this._invalidInputClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorVisibleClass);
	}

	_hideError(input) {
		const errorElement = this._form.querySelector(`#${input.id}-error`);
		input.classList.remove(this._invalidInputClass);
		errorElement.classList.remove(this._errorVisibleClass);
		errorElement.textContent = '';
	}

}

const logInFormValidator = new FormValidator('#login-form');
const recoveryFormValidator = new FormValidator('#password-recovery-form');
logInFormValidator.enableValidation();
recoveryFormValidator.enableValidation();



// с обязательным чекбоксом
class FormValidatorExtended extends FormValidator {

	constructor(formSelector) {
		super(formSelector);
		this._requiredCheckbox = this._form.querySelector('.checkbox__true-checkbox_required');
	}

	enableValidation() {
		super.enableValidation();
		this._requiredCheckbox.addEventListener('click', () => {
			this._toggleButtonState(this._submitButton);
		});
	}

	_toggleButtonState() {
		if (this._requiredCheckbox.checked && !this._hasInvalidInput()) {
			this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
			this._submitButton.style.cursor = 'pointer';
		} else {
			this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', true);
			this._submitButton.style.cursor = 'default';
		}
	}

}

const subscribeFormValidator = new FormValidatorExtended('#subscribe-form');
const signInFormValidator = new FormValidatorExtended('#signin-form');
subscribeFormValidator.enableValidation();
signInFormValidator.enableValidation();