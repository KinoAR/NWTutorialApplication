function enableButton(buttonId) {
  $(buttonId)[0].removeAttribute("disabled");
}

function disableButton(buttonId) {
  $(buttonId)[0].setAttribute("disabled", "disabled");
}