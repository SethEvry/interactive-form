// Variable declarations
const userName = document.getElementById("name");
const title = document.getElementById("title");
const other = document.getElementById("other-job-role");
const design = document.getElementById("design");
const color = document.getElementById("color");
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
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

// start up methods and functions
addOther();
userName.focus();
toggleColor();

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
