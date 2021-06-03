let ageSlider = document.querySelector('#age_slider');
let ageCounter = document.querySelector('#age_counter');

let locationTypesList = document.querySelector('#location_types');
let locationTypes = locationTypesList.getElementsByTagName('li');
let locationsText = document.querySelector('#locations_text');
let locationsList = document.querySelector('#locations_list');
let locations = locationsList.getElementsByTagName('li');
let dogeVibesList = document.querySelector('#doge_vibe_list');
let dogeVibes = dogeVibesList.getElementsByTagName('li');

let submitButton = document.querySelector('#submit_button');

//Function that enables the submit button when the user has filled in all the search criteria.
function enableSubmitButton() {
  shouldSubmitButtonBeEnabled()
    ? (submitButton.disabled = false)
    : (submitButton.disabled = true);
}

function shouldSubmitButtonBeEnabled() {
  return (
    ageSlider.value != 0 &&
    isOneBoxChecked(dogeVibes) &&
    isOneBoxChecked(locationTypes) &&
    isOneBoxChecked(locations)
  );
}

//Function that checks if one of the ceckboxes in a list has been checked.
function isOneBoxChecked(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].firstElementChild.checked) {
      return true;
    }
  }
  return false;
}

//Function that filters the locations based on the checked location types.
function filterLocations(type, display) {
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].classList.contains(type)) {
      if (display) {
        locations[i].style.display = 'block';
      } else {
        locations[i].style.display = 'none';
        //Uncheck all the corresponding locations when a location type gets unchecked.
        locations[i].firstChild.checked = false;
      }
    }
  }
}

//Funtion that toggles the location text when a location type gets checked.
function toggleLocationText() {
  isOneBoxChecked(locationTypes)
    ? (locationsText.style.display = 'none')
    : (locationsText.style.display = 'block');
}

//Update the age counter element when the silder recieves an input.
ageSlider.addEventListener('input', () => {
  let countValue = ageSlider.value;
  countValue != 0
    ? (ageCounter.innerHTML = `0 - ${countValue}`)
    : (ageCounter.innerHTML = 'Select an age');
  enableSubmitButton();
});

//All of the following event listeners check if the submit button can be enabled.
dogeVibesList.addEventListener('click', event => {
  if (event.target.tagName == 'INPUT') {
    enableSubmitButton();
  }
});

locationTypesList.addEventListener('click', event => {
  if (event.target.tagName == 'INPUT') {
    //Filter the locations and toggle the location text based on the given input.
    filterLocations(event.target.id, event.target.checked);
    toggleLocationText();
    enableSubmitButton();
  }
});

locationsList.addEventListener('click', event => {
  if (event.target.tagName == 'INPUT') {
    enableSubmitButton();
  }
});

//Turn the display of the locations off and disable the submit button when the user first loads the search page.
window.addEventListener('load', () => {
  for (let i = 0; i < locations.length; i++) {
    locations[i].style.display = 'none';
  }
  submitButton.disabled = true;
});
