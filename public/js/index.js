
console.log(document.getElementById('direction'));
var directionEl = document.getElementById('direction');
if (directionEl.innerHTML === 'increased') {
    directionEl.setAttribute('style', 'color: green;');
} else if (directionEl.innerHTML === 'decreased') {
    directionEl.setAttribute('style', 'color: red;');
} else { };

