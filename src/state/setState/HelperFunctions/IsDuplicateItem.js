'use strict'

export default function isDuplicateItem(compareBy,arrayOfObjects,checkForValue){

  // helper function to determine if an item exists in an Array of Objects
  // Arguments are self explanatory.  What you compare by and the array
  // compareBy needs to be a string of what you compare by
  //
  for (var i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i][compareBy] === checkForValue) {
      return true
      break;
    }
  };
  return false
}
