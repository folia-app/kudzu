var canvas = document.getElementById("myCanvas");
console.log({canvas})

var ctx = canvas.getContext("2d");
var size = 512
canvas.width = size
canvas.height = size
let rows, margin, circleSize, radius, totalRows, offset
// ctx.fillRect(0, 0, size, size);
// var circleSize = size / (rows + margin * 2)


  
function makeLeaf() {

  let choose = (Math.floor(Math.random() * 4) + 1  )
  makeLeafPointing(choose)
}



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
  [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

function makeLeafPointing(choose) {


  rows = _8x8.length
  margin = 1
  circleSize = size / (rows + margin * 2)
  radius = circleSize / 2 
  totalRows = size / circleSize
  offset =  margin * circleSize
  makeBase(_8x8)
  makePoint(_8x8)
}


function makePoint(grid) {
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

  for (var i = 0; i < grid.length; i++) {
    var row = grid[i]
    for (var j = 0; j < row.length; j++) {
      var fill = grid[i][j] == 8
      if (!fill) continue
      makeCircle(i, j)
    }
  }
}

function makeBase(grid) {
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i]
    for (var j = 0; j < row.length; j++) {
      var fill = grid[i][j] == 0
      if (fill) {
        makeCircle(i, j)
      } else if (grid[i][j] == 3){
        makeCircle(i, j, '#F00')
      }
    }
  }
}


function getGreen() {
  return `#00${(Math.floor(Math.random() * 256) + 1  ).toString(16)}00`
}

function makeCircle (i,j, color) {
  var x =  (i * circleSize) + (circleSize / 2) + offset;
  var y =  (j * circleSize) + (circleSize / 2) + offset;
  ctx.beginPath();
  var startAngle = 0
  var endAngle = 2 * Math.PI
  var counterclockwise = 0
  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  // ctx.arc(x, y, radius * 1.5, 0, .5 * Math.PI, 0)

  ctx.fillStyle = color ||getGreen();
  ctx.fill(); 

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
  // ctx.fillStyle = '#ff0000'
  ctx.fill(); 


}

// ctx.beginPath();
// foo = 256 / 2
// r = foo / 2
// ctx.arc(foo, foo, r, 0, 2 * Math.PI, 0);
// ctx.fill(); 

// ctx.beginPath();
// ctx.arc(foo / 2, foo, r * 2, 0, .4 * Math.PI, 0);
// // ctx.drawLine(0,0)
// ctx.arc(0, foo, r* 2, 0, 0, 0)
// ctx.fill(); 



makeLeaf()

makeEyes()

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
