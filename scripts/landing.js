var pointsArray = document.getElementsByClassName("point");

var revealPoints = function(points) {
  points.style.opacity = 1;
  points.style.transform = "scaleX(1) translateY(0)";
  points.style.msTransform = "scaleX(1) translateY(0)";
  points.style.WebkitTransform = "scaleX(1) tanslateY(0)";
};

var animatePoints = function(points) {
  forEach(points, revealPoints);
};

window.onload = function() {
  // Automatically animate on tall screens
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }
  // Animate on scroll
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top -window.innerHeight + 200;
  window.addEventListener('scroll', function(event) {
    if (document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  });
}
