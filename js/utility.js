function enableButton(buttonId) {
  $(buttonId)[0].removeAttribute("disabled");
}

function disableButton(buttonId) {
  $(buttonId)[0].setAttribute("disabled", "disabled");
}

function playSound(audioId) {
  //$(audioId)[0].loop = true;
  $(audioId)[0].play();
}

function pauseSound(audioId) {
  $(audioId)[0].loop = false;
  $(audioId)[0].pause();
}
