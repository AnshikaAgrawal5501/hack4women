var header = document.getElementByclassName("wrapper");
var btns = header.getElementsByClassName("navoptions");
for (var i = 1; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}