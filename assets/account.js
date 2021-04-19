// ВАЛИДАЦИЯ ФОРМ
// без обязательного чекбокса (вход, восстановление пароля)

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





// ВАЛИДАЦИЯ ФОРМ
// с обязательным чекбоксом (подписка, регистрация)

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

// PROFILE VALIDATION

class profileFormValidator extends FormValidator {

    constructor(formSelector) {
      super(formSelector);
      this._editButton = this._form.querySelector('#profile-edit-button');
      this._nameInput = document.querySelector('#profile-name');
      this._name = this._nameInput.value;
      this._surnameInput = document.querySelector('#profile-surname');
      this._surname = this._surnameInput.value;
      this._nicknameInput = document.querySelector('#profile-nickname');
      this._nickname = this._nicknameInput.value;
      this._emailInput = document.querySelector('#profile-email');
      this._email = this._emailInput.value;
      this._passwordInput = document.querySelector('#profile-password');
      this._password = this._passwordInput.value;
    }

    enableValidation() {
      super.enableValidation();
      this._editButton.addEventListener('click', () => this._unlockForm());
    }

    _unlockForm() {
      this._editButton.classList.add('hollow-button_hidden');
      this._submitButton.classList.remove('black-button_hidden');
      this._inputs.forEach(input => {
        input.value = '';
        input.removeAttribute('readonly');
      });
      this._toggleButtonState();
    }

    resetForm() {
      this._editButton.classList.remove('hollow-button_hidden');
      this._submitButton.classList.add('black-button_hidden');
      this._inputs.forEach(input => {
        input.setAttribute('readonly', true);
      });
      this._nameInput.value = this._name;
      this._surnameInput.value = this._surname;
      this._nicknameInput.value = this._nickname;
      this._emailInput.value = this._email;
      this._passwordInput.value = this._password;
      this.resetValidation();
    }
  }

  const profileValidator = new profileFormValidator('#profile');
  profileValidator.enableValidation();





  // PAGE SWITCHER

  const profile = document.querySelector('#profile');
  const orders = document.querySelector('#orders');
  const profileSwitcher = document.querySelector('#switcher-profile');
  const ordersSwitcher = document.querySelector('#switcher-orders');

  function showProfile() {
    profile.classList.remove('profile_hidden');
    orders.classList.add('acc-orders_hidden');
  }

  function showOrders() {
    profile.classList.add('profile_hidden');
    orders.classList.remove('acc-orders_hidden');
  }

  profileSwitcher.addEventListener('click', () => showProfile());
  ordersSwitcher.addEventListener('click', () => {
    profileValidator.resetForm();
    showOrders();
  });
