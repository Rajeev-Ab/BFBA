'use strict'

const COLORS =  ["#660000", "#009900", "#669999", "#6666CC", "#9D1D1B", "#066FD2", "#007BB6", "#C00000", "#666666", "#5E5F1D", "#990000", "#669966", "#000066", "#660066", "#67CEA6", "#676767", "#045378", "#A70505", "#2C8865", "#3A95CA", "#CC3333", "#006666", "#666699", "#993399", "#CC2421", "#AD6A0B", "#0574A7", "#C00606", "#2F81B1", "#2E7DAA", "#666633", "#336666", "#0000CC", "#CC99CC", "#068FCA", "#C87A0C", "#8FA350", "#16596E", "#7C0404", "#18425A", "#006600", "#339999", "#0000FF", "#330033", "#0557A3", "#5EBD5E", "#68763A", "#2083A2", "#888A2A", "#2C78A4"];

export default function setBackgroundColor(firstName,lastName){
  // returns a color code based on firstName and lastName and the calculations below

  let index = 0;
  if ( firstName !== '' ) {
      index = firstName.charCodeAt(0);
  };
  if ( lastName !== '' ) {
      index += lastName.charCodeAt(0);
  };
  if (index >= COLORS.length) {
      index = index % COLORS.length;
  };
  return COLORS[index];
}
