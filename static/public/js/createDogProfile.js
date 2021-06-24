let ageSlider = document.querySelector('#age_slider');
let ageCounter = document.querySelector('#age_counter');

let dogeVibesList = document.querySelector('#doge_vibe_list');
let dogeVibes = dogeVibesList.getElementsByTagName('li');

let locationTypesList = document.querySelector('#location_types');
let locationTypes = locationTypesList.getElementsByTagName('li');
//Update the age counter element when the silder recieves an input.
ageSlider.addEventListener('input', () => {
    let countValue = ageSlider.value;
    countValue != 0
      ? (ageCounter.innerHTML = `0 - ${countValue}`)
      : (ageCounter.innerHTML = 'Select an age');
  });

  //Function that checks if one of the ceckboxes in a list has been checked.
function isOneBoxChecked(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].firstElementChild.checked) {
        return true;
      }
    }
    return false;
  }
