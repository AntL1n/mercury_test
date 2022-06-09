const form = document.querySelector(".shake");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // статус валидации
  let velidateStatus;

  // удаление сообщений об ошибках, если они есть
  const errors = document.querySelectorAll(".error");

  if (errors.length >= 1) {
    errors.forEach((error) => {
      error.remove();
    });
  }

  const nameInputs = form.querySelectorAll('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');

  nameInputs.forEach((input) => {
    velidateStatus = inputVal(input);
  });

  velidateStatus = emailVal(emailInput);
});

// валидация поля first, last__name

function inputVal(input) {
  const value = input.value;

  let checkvalue = () => {
    for (let i = 0; i < value.length; i++) {
      if (value[i].toLowerCase() === value[i].toUpperCase()) {
        input.insertAdjacentHTML(
          "afterend",
          '<div class="error">Поле не должно содержать спец. символов и цифр</div>'
        );

        return false;
      }
    }
    return true;
  };

  let checkvalueLength = () => {
    if (value.length < 3) {
      input.insertAdjacentHTML(
        "afterend",
        '<div class="error">Поле должно иметь более 2 символов</div>'
      );
      return false;
    }
    return true;
  };

  checkvalue();
  checkvalueLength();

  return checkvalue && checkvalueLength;
}

// валиация email

function emailVal(emailInput) {
  const email = emailInput.value;
  const atIndex = email.indexOf("@");

  if (atIndex < 0) {
    emailInput.insertAdjacentHTML(
      "afterend",
      '<div class="error">Поле должно содержать символ "@"</div>'
    );
    return false;
  }

  if (!email.includes(".", atIndex)) {
    emailInput.insertAdjacentHTML(
      "afterend",
      '<div class="error">Поле должно содержать символ ".", после символа "@"</div>'
    );
    return false;
  }

  return true;
}
