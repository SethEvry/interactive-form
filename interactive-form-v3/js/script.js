// Variable declarations
const userName = document.getElementById("name");
const title = document.getElementById("title");
const other = document.getElementById("other-job-role");
const design = document.getElementById("design");
const color = document.getElementById("color");
//function declarations
const addOther = () => {
  if (title.value === "other") {
    other.style.display = "";
  } else {
    other.style.display = "none";
  }
};
const toggleColor = () => {
  const options = color.children;
  if (design.value === "Select Theme") {
    color.setAttribute("disabled", true);
  } else {
    color.removeAttribute("disabled");
    for (let option of options) {
      if (design.value !== option.getAttribute("data-theme")) {
        option.style.display = "none";
      } else {
        option.style.display = "";
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
