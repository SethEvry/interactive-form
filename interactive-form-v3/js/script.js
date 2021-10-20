// Variable declarations
const userName = document.getElementById("name");
const title = document.getElementById("title");
const other = document.getElementById("other-job-role");
//function declarations
const addOther = () => {
  if (title.value === "other") {
    other.style.display = "";
  } else {
    other.style.display = "none";
  }
};
// start up methods and functions
addOther();
userName.focus();
// Adds the job role box if other is selected
title.addEventListener("change", () => {
  addOther();
});
