const circleType = new CircleType(document.getElementById('circle-type'));

console.log(circleType.container);
//=> <div style="position: relative; height: 3.18275em;">...</div>

// Enable the force width option
circleType.forceWidth(true);
circleType.forceHeight(true);

console.log(circleType.container);
//=> <div style="position: relative; height: 3.18275em; width: 12.7473em;">...</div>
