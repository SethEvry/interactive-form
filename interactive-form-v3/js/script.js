// Variable declarations
const form = document.querySelector("form");

const userName = document.getElementById("name");
const email = document.getElementById("email");

const title = document.getElementById("title");
const other = document.getElementById("other-job-role");

const design = document.getElementById("design");
const color = document.getElementById("color");

const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");

const payment = document.getElementById("payment");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const creditCard = document.getElementById("credit-card");

//function declarations

/**
 * Checks to see if other box is selected and siplays text box if it is.
 */
const addOther = () => {
  if (title.value === "other") {
    other.style.display = "";
  } else {
    other.style.display = "none";
  }
};
/**
 * disables color selector if theme is not chosen, then only displays colors for respective themes.
 */
const toggleColor = () => {
  const options = color.children;
  if (design.value === "Select Theme") {
    color.setAttribute("disabled", true);
  } else {
    color.removeAttribute("disabled");
    for (let option of options) {
      if (design.value !== option.getAttribute("data-theme")) {
        option.setAttribute("hidden", "");
      } else {
        option.removeAttribute("hidden");
      }
    }
  }
};

/**
 * Checks to see if activities are checked. Returns a boolean.
 *
 */
const isChecked = function () {
  let inputs = activities.querySelectorAll("input");
  for (let input of inputs) {
    if (input.checked) {
      return true;
    }
  }
  return false;
};
/**
 * Adds/Subtracts the cost of an activity to/from the total and displays it.
 */
const activitiesCheck = (e) => {
  let cost = 0;
  const checkbox = e.target;
  if (checkbox.checked) {
    cost += parseInt(checkbox.getAttribute("data-cost"));
  } else {
    cost -= parseInt(checkbox.getAttribute("data-cost"));
  }
  //Total: $0
  let number = parseInt(activitiesCost.textContent.slice(8));
  number += cost;
  activitiesCost.textContent = `Total: $${number}`;
};
/**
 * disables conflicting activities
 */
const conflictHandler = (e) => {
  const element = e.target;
  const checkboxes = activities.querySelectorAll("input");
  const boxCheck = () => {
    let boxArray = [];
    for (let checkbox of checkboxes) {
      if (
        element.getAttribute("data-day-and-time") ===
          checkbox.getAttribute("data-day-and-time") &&
        element !== checkbox
      ) {
        boxArray.push(checkbox);
      }
    }
    return boxArray;
  };
  const toggleBox = (toggle) => {
    const array = boxCheck();
    array.forEach((box) => {
      if (toggle) {
        box.setAttribute("disabled", true);
        box.parentElement.classList.add("disabled");
      } else {
        box.removeAttribute("disabled");
        box.parentElement.classList.remove("disabled");
      }
    });
  };
  if (element.checked) {
    {
      toggleBox(true);
    }
  } else {
    toggleBox(false);
  }
};

/**
 * Sets default payment method or displays chosen method
 */
const paymentDisplay = (target) => {
  if (!target) {
    payment.children[1].setAttribute("selected", "");
    paymentDisplay(payment.children[1]);
  } else {
    const value = target.value;
    const methods = document.querySelector(".payment-methods").children;
    for (let i = 2; i < methods.length; i++) {
      if (methods[i].id === value) {
        methods[i].style.display = "block";
      } else {
        methods[i].style.display = "none";
      }
    }
  }
};
/**
 * returns whether input is valid for the field
 */
const isValid = (input, type) => {
  const validObj = {
    name: /^\w+/,
    email: /^\w+@\w+\.com$/,
    cardNumber: /^\d{13,16}$/,
    zipCode: /^\d{5}$/,
    ccv: /^\d{3}$/,
  };
  return validObj[type].test(input);
};
/**
 * displays or removes hints
 */
const toggleHint = (element, bool) => {
  if (element.querySelector("input") === email) {
    if (!email.value) {
      element.lastElementChild.textContent =
        "Email Address field cannot be blank";
    } else {
      element.lastElementChild.textContent =
        "Email address must be formatted correctly";
    }
  }
  const validity = bool
    ? ["valid", "not-valid", "none"]
    : ["not-valid", "valid", "block"];
  element.classList.add(validity[0]);
  element.classList.remove(validity[1]);
  element.lastElementChild.style.display = validity[2];
};
// start up methods and function calls
addOther();
userName.focus();
toggleColor();
paymentDisplay();

// Event Handlers

/**
 * Handles focus changes in the activities section
 */
for (child of activities.querySelectorAll("input")) {
  child.addEventListener("focus", (e) => {
    e.target.parentNode.className = "focus";
  });
  child.addEventListener("blur", (e) => {
    e.target.parentNode.className = "";
  });
}
/**
 * Consolidated change handler
 */
form.addEventListener("change", (e) => {
  if (e.target === title) {
    addOther();
  } else if (e.target === design) {
    toggleColor();
  } else if (e.target.type === "checkbox") {
    activitiesCheck(e);
    conflictHandler(e);
  } else if (e.target === payment) {
    paymentDisplay(e.target);
  }
});
/**
 * key up handler for real-time error message
 */
form.addEventListener("keyup", (e) => {
  const validName = isValid(userName.value, "name");
  const validEmail = isValid(email.value, "email");
  if (e.target === userName) {
    toggleHint(userName.parentElement, validName);
  } else if (e.target === email) {
    toggleHint(email.parentElement, validEmail);
  }
});
/**
 *Checks for complete and valid form entries before submitting
 *
 */
form.addEventListener("submit", (e) => {
  const validName = isValid(userName.value, "name");
  const validEmail = isValid(email.value, "email");
  const checked = isChecked();
  let validPayment = true;
  toggleHint(userName.parentElement, validName);
  toggleHint(email.parentElement, validEmail);
  toggleHint(activities, checked);
  if (payment.value === "credit-card") {
    const inputs = creditCard.querySelectorAll("input");
    const validCreditCard = [
      isValid(inputs[0].value, "cardNumber"),
      isValid(inputs[1].value, "zipCode"),
      isValid(inputs[2].value, "ccv"),
    ];
    for (let i in validCreditCard) {
      toggleHint(inputs[i].parentElement, validCreditCard[i]);
    }
    if (validCreditCard[0] && validCreditCard[1] && validCreditCard[2]) {
      validPayment = true;
    } else {
      validPayment = false;
    }
  }
  if (validName && validEmail && checked && validPayment) {
    console.log("Submitted!");
  } else {
    e.preventDefault();
  }
});
