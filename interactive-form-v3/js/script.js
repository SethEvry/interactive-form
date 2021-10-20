// Variable declarations
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
const form = document.querySelector("form");

//function declarations

/**
 * Checks to see if other box is selected and siplays text box if it is.
 */
const addOther = () => {
  if (title.value === "other") {
    other.style.hidden = "";
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
 * Sets default payment method
 */
const paymentDisplay = () => {
  payment.children[1].setAttribute("selected", "");
  paypal.style.display = "none";
  bitcoin.style.display = "none";
};

// start up methods and function calls
addOther();
userName.focus();
toggleColor();
paymentDisplay();

// Event Handlers

/**
 * Adds job role text input when other is selected
 */
title.addEventListener("change", () => {
  addOther();
});
/**
 * Enables shirt color selector when a design is chosen
 */
design.addEventListener("change", () => {
  toggleColor();
});
/**
 * Adds/Subtracts the cost of an activity to/from the total and displays it.
 */
activities.addEventListener("change", (e) => {
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
});
for (child of activities.querySelectorAll("input")) {
  child.addEventListener("focus", (e) => {
    e.target.parentNode.className = "focus";
  });
  child.addEventListener("blur", (e) => {
    e.target.parentNode.className = "";
  });
}

/**
 *
 *
 */
form.addEventListener("submit", (e) => {
  let error = 0;
  if (!/^\w+/.test(userName.value)) {
    userName.parentElement.classList.add("not-valid");
    userName.parentElement.classList.remove("valid");
    userName.parentElement.lastElementChild.style.display = "block";
    error++;
  } else {
    userName.parentElement.classList.add("valid");
    userName.parentElement.classList.remove("not-valid");
    userName.parentElement.lastElementChild.style.display = "none";
  }
  if (!/^\w+@\w+\.com$/.test(email.value)) {
    email.parentElement.classList.add("not-valid");
    email.parentElement.classList.remove("valid");
    email.parentElement.lastElementChild.style.display = "block";
    error++;
  } else {
    email.parentElement.classList.add("valid");
    email.parentElement.classList.remove("not-valid");
    email.parentElement.lastElementChild.style.display = "none";
  }

  let check;
  for (child of activities.querySelectorAll("input")) {
    if (child.checked) {
      check = true;
      break;
    }
  }
  if (!check) {
    error++;
  }
  if (payment.value === "credit-card") {
    const inputs = creditCard.querySelectorAll("input");
    if (!/^\d{13,16}$/.test(inputs[0].value)) {
      error++;
    }
    if (!/^\d{5}$/.test(inputs[1].value)) {
      error++;
    }
    if (!/^\d{3}$/.test(inputs[2].value)) {
      error++;
    }
  }
  if (error) {
    e.preventDefault();
  }
});
