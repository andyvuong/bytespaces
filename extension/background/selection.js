var s = document.getSelection();
var oRange = s.getRangeAt(0);
var objectRect = oRange.getBoundingClientRect();
console.log(objectRect);