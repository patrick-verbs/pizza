// Utility functions
////////////////////
function clamp(number, min, max) { // Credit to answer by "dweeves" at https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
  return number <= min ? min : number >= max ? max : number
}

function removeArrayValue(array, value, all) {
  if (all) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] != value) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  } else {
    const index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }
}