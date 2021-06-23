let dogeVibesList = document.querySelector('#doge_vibe_list');
let dogeVibes = dogeVibesList.getElementsByTagName('li');

var vibeArray = []
//var checkboxes = document.querySelector('#doge_vibe_list')

//for (var i = 0; i < checkboxes.length; i++) {
//  vibeArray.push(checkboxes[i].value)
// }
//console.log(checkboxes)

//Function that checks if one of the ceckboxes in a list has been checked.
let list = dogeVibesList.getElementsByTagName('li');

function doggoCheck(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].firstElementChild.checked) {
        vibeArray.push(list[i].value)
    }
  }

  console.log(error);
}