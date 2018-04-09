'use strict'

export default function findIndex(arrayOfObjects, object){
  let index = - 1;
  for (var i = 0; i < arrayOfObjects.length; i++) {
    if ( arrayOfObjects[i].id === object.id ) {
      index = i
      break
    }
  }
  return index
};
