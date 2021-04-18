
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var size = 768
canvas.width = size
canvas.height = size
let rows, margin, circleSize, radius, totalRows, offset
// ctx.fillRect(0, 0, size, size);
// var circleSize = size / (rows + margin * 2)

// Math.seedrandom('asfdasf');


var _5x5 = [
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,1,1,1,1],
  [1,1,1,0,0,0,0,0,1,1,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,1,0,0,0,0,0,1,1,1],
  [1,1,1,1,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
]

var _5x5_point = [
  [1,1,1,1,1,1,1,1,1,8,1],
  [1,1,1,1,1,1,1,1,8,8,1],
  [1,1,1,1,0,0,0,8,8,8,1],
  [1,1,1,0,0,0,0,0,8,8,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,1,1],
  [1,1,1,0,0,0,0,0,1,1,1],
  [1,1,1,1,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
]

var _7x7 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,8],
  [1,1,1,1,1,1,1,1,1,1,8,8,8],
  [1,1,1,1,1,0,0,0,8,8,8,8,8],
  [1,1,1,0,0,0,0,0,0,0,8,8,1],
  [1,1,1,0,0,0,0,0,0,0,8,8,1],
  [1,1,0,0,0,0,0,0,0,0,0,8,1],
  [1,1,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,1,1,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
]


var _8x8 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,8,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,8,8,1,1],
  [1,1,1,1,1,1,1,1,1,8,8,8,8,1,1],
  [1,1,1,1,1,1,0,0,0,8,8,8,8,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,8,8,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,8,8,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,3,3,1,0,0,0,1,1,1,1,1,1],
  [1,1,1,3,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

async function makeLeaf() {
  rows = _8x8.length
  margin = 1
  circleSize = size / (rows + margin * 2)
  radius = circleSize / 1.25 
  totalRows = size / circleSize
  offset =  margin * circleSize

  var [grid, corner, rotation] = getGrid(_8x8)
  // makeBG(corner, rotation)
  // await addStem()
  // makeStem(grid)
  makeAll(grid)
  addPNG()
  // makeEyes()
}

function addStem() {
  return new Promise((resolve, reject) => {
    var drawing2 = new Image();
    drawing2.src = `stem-4.png`;
    drawing2.onload = function() {
      ctx.drawImage(drawing2,0,0);
      resolve()
    };
  })
}

function addPNG() {
  var drawing = new Image();
  var name = Math.floor(Math.random() * 34) + 1
  // name = 5
  var drawingSize = 480;
  var drawingPos = (size - drawingSize) / 2
  drawing.src = `/eyes/${name}.png`;
  drawing.onload = function() {
    ctx.drawImage(drawing,drawingPos,drawingPos);
  };

  var drawing2 = new Image();
  var name2 = Math.floor(Math.random() * 34) + 1
  drawing2.src = `/mouth/${name2}.png`;
  drawing2.onload = function() {
    ctx.drawImage(drawing2,drawingPos,drawingPos);
  };
}

function getGrid(grid) {
  var corner = Math.floor(Math.random() * 4) + 1
  var rotation = Math.floor(Math.random() * 2) + 1
  // corner = 4;
  // rotation = 1;
  var _grid = []
  if (rotation == 2) {
    _grid = new Array(grid.length).fill([]).map(item => new Array(grid.length).fill(0))
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid.length; j++) {
        _grid[j][i] = grid[i][j]
      }
    }
    grid = _grid
  }
  switch(corner) {
    case(1):
      grid = grid.reverse()
      grid.map(r => r.reverse())
      break;
    case(2):
      grid = grid.reverse()
      break;
    case(3):
      grid.map(r => r.reverse())
      break;
  }
  return [grid, corner, rotation]
}



function makeBG(corner, rotation) {
  var radgrad = ctx.createRadialGradient(size/2,size/2 , 0, size/2, size/2, size/2 );
  radgrad.addColorStop(0, 'rgba(0,0,0,0.5)');
  radgrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = radgrad;
  ctx.fillRect(0,0,size,size);
}

function makeStem(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      if (grid[i][j] == 3) {
        makeSmallLeaf(i,j, '#8B4513')
      }
    }
  }
}
function makeAll(grid) {

  var sequence = Array.from(Array(grid.length * grid.length).keys())
  shuffle(sequence)
  for (var i = 0; i < sequence.length; i++) {
    var row = Math.floor(sequence[i] / grid.length)
    var col = (sequence[i] % grid.length) 
    if (grid[row][col] == 0 || grid[row][col] == 8) {
      // if (grid[row][col] == 0) {
        makeSmallLeaf(row, col)
    }
  }
}

function getGreen() {
  if (Math.random() > .92) {
    // return '#663399'
    // return `#00${(Math.floor(Math.random() * 100) + 101  ).toString(16) + (Math.floor(Math.random() * 100) + 101  ).toString(16)}`
  }
  if (Math.random() > .92) {
    // return '#FFD700'
    // return `#00${(Math.floor(Math.random() * 100) + 101  ).toString(16) + (Math.floor(Math.random() * 100) + 101  ).toString(16)}`
  }
  return `#00${(Math.floor(Math.random() * 100) + 101  ).toString(16)}00`
}

function makeSmallLeaf (i,j, color) {
  var x =  (i * circleSize) + (circleSize / 2) + offset;
  var y =  (j * circleSize) + (circleSize / 2) + offset;
  ctx.fillStyle = color ||getGreen();
  let rotate 
  ctx.beginPath();
  var side = Math.floor(Math.random() * 4) + 1

  switch(side) {
    case(1):
      rotate = 0
      ctx.arc(x - (radius), y, radius * 2, rotate, rotate + .4 * Math.PI, 0);
      ctx.arc(x - (radius*2), y, radius* 2, rotate, rotate, 0)
      break;
    case(2):
      rotate = Math.PI //Math.floor(Math.random() * 4) / 2
      ctx.arc(x + radius  , y , radius * 2, rotate, rotate + .4 * Math.PI, 0);
      ctx.arc(x + (radius*2), y, radius * 2, rotate, rotate, 0)
      break;
    case(3):
      rotate = - Math.PI/2
      ctx.arc(x , y + radius, radius * 2, rotate, rotate + .4 * Math.PI, 0);
      ctx.arc(x , y + radius*2, radius* 2, rotate, rotate, 0)
      break;
    case(4):
      rotate = - Math.PI
      ctx.arc(x + (radius/2), y + (radius* .9), radius * 2, rotate, rotate + .4 * Math.PI, 0);
      ctx.arc(x + radius*2 , y - (radius * .1), radius* 2, rotate, rotate, 0)
      break;
  }

  // circle
  var startAngle = 0
  var endAngle = 2 * Math.PI
  var counterclockwise = 0
  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  ctx.fill(); 

}
function makeEyes () {

   var y = size / 2
   var offset = size / 50
   var l = size / 2.5
   var r = (size / 2.5) + (size / 2.5) / 2
   var big = size / 14.4
   var med = size / 15
   var sml = size / 25
   var xsml = size / 60
  ctx.beginPath();

  ctx.arc(l, y, big, 0, 2 * Math.PI, 0);
  ctx.arc(r, y, big, 0, 2 * Math.PI, 0);
  ctx.fillStyle = "#000"
  ctx.fill(); 

  ctx.beginPath();

  ctx.arc(l, y, med, 0, 2 * Math.PI, 0);
  ctx.arc(r, y, med, 0, 2 * Math.PI, 0);
  // ctx.fillStroke = "#000"
  ctx.fillStyle = "#FFF"
  ctx.fill(); 


  ctx.beginPath();

  ctx.arc(l, y, sml, 0, 2 * Math.PI, 0);
  ctx.arc(r, y, sml, 0, 2 * Math.PI, 0);

  ctx.fillStyle = "#000"
  ctx.fill(); 


  ctx.beginPath();

  ctx.arc(l - offset, y - offset, xsml, 0, 2 * Math.PI, 0);
  ctx.arc(r - offset, y - offset, xsml, 0, 2 * Math.PI, 0);

  ctx.fillStyle = "#fff"
  ctx.fill(); 
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function makeSingleLeaf(x, y, clockwise, direction, color) {
  // ctx.fillStyle = '#bbb'
  ctx.fillStyle = "rgba(100 ,100, 100, 1)";
  // ctx.filter = `blur(${size / 55}px)`;

  // ctx.shadowColor = "black";
  // ctx.shadowBlur = 6;
  // ctx.shadowOffsetX = 0;
  // ctx.shadowOffsetY = 0;
  ctx.beginPath();
  width = size / 4
  x = size / 2
  y = size / 2
  corner = 1
  rotation = 1
  console.log({corner, rotation})
  ctx.arc(x, y, width, 0, 2 * Math.PI, 0);
  // ctx.fill(); 
  if (rotation == 2) {
    if (corner == 1) {

    } else if (corner == 2) {

    }else if (corner == 3) {

    }else if (corner == 4) {

    }
  } else {
    if (corner == 1) {
      var xx = x - width
      var yy = y
      var wwidth = width * 2
      ctx.arc(xx, yy, wwidth, 0, .4 * Math.PI, 0)

      var xxx = x * .7
      var yyy = y + width * 1.4
      var wwwidth = width / 1.8
      ctx.arc(xxx, yyy, wwwidth, .333 * Math.PI,  1.6 * Math.PI, 1)

      // ctx.lineTo(x, y);
    } else if (corner == 2) {

    }else if (corner == 3) {

    }else if (corner == 4) {

    }
  }

  // ctx.beginPath();

  ctx.shadowBlur = 10;

  // ctx.shadowBlur = 1;

ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
  // ctx.arc(0, size/2, size/2, 0, 0, 0, 0)
  ctx.fill(); 
    // ctx.save(); // saves the coordinate system
  ctx.rotate(45); // <<< set current transformation to rotated
  // ctx.closePath();

  ctx.shadowBlur = 0;
  ctx.filter = 'blur(0px)';
}

// var happy = Math.random() > .5
// // happy = false

// ctx.beginPath();
// if (happy) {
//   ctx.arc(size / 2, size / 1.5, size / 10, Math.PI, 2* Math.PI, 0)
// } else {
//   ctx.arc(size / 2, size / 1.7, size / 10, 0, Math.PI, 0)
// }
// ctx.fillStyle = '#F00'
// ctx.fill(); 


// ctx.beginPath();
// if (happy) {
//   ctx.arc(size / 2, size / 1.525, size / 13, Math.PI, 2* Math.PI, 0)
// } else {
//   ctx.arc(size / 2, size / 1.67, size / 13, 0, Math.PI, 0)
// }
// ctx.fillStyle = '#FFF'
// ctx.fill(); 


// 32 bytes
// 256 bits
// 16 colors?
// XXXX
// XXXX
// XXXX
// AABBCCDD
// EEFF0011
// 22334455
// 66778899

// Fa398d67
// 2936Dcf4
// 28116F68
// 72440349
// 61545D91


  makeLeaf()