// Got stuck on the wording of the assignment: " Use a loop to go through all elements in the array. Which array? pointsArray? The, what callback function? What should it do?

var pointsArray = document.getElementsByClassName("point");

var forEach = function(pointIndex, callback) {
  for (var i = 0; i < points.length; i++) {
    revealPoints(i);
  }
};



//ANSWER
//function forEach(array, callback) {
//  for (var i = 0; i < array.length; i++) {
//    callback(array[i]);
//  }
//}