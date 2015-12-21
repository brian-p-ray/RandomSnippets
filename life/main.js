var func;
var xLimit = 20;
var yLimit = 20;
var grid = new Array();

for(var x = 0; x < xLimit; x++) {
	for(var y = 0; y < yLimit; y++) {
		grid['x'+x+'y'+y] = 0;
	}
}

var glider = new Array('x2y1', 'x3y2', 'x1y3', 'x2y3', 'x3y3');
var length = glider.length;
for(var i = 0; i < length; i++) {
	grid[glider[i]] = 1;
}

process(grid);
display(grid);

func = setInterval(function(){
	grid = process(grid);
	console.log(grid);
	display(grid);
},100);

function process(grid) {
	var newGrid = new Array();
	for(var x = 0; x < xLimit; x++) {
		for(var y = 0; y < yLimit; y++) {
			var neighbors = new Array();
			if(x-1 >= 0) {
				neighbors.push(grid['x'+(x-1)+'y'+y]);
			}
			if(y-1 >= 0) {
				neighbors.push(grid['x'+x+'y'+(y-1)]);
			}
			if(x-1 >= 0 && y-1 >= 0) {
				neighbors.push(grid['x'+(x-1)+'y'+(y-1)]);
			}
			if(x+1 <= xLimit-1) {
				neighbors.push(grid['x'+(x+1)+'y'+y]);
			}
			if(y+1 <= yLimit-1) {
				neighbors.push(grid['x'+x+'y'+(y+1)]);
			}
			if(x+1 <= xLimit-1 && y+1 <= yLimit-1) {
				neighbors.push(grid['x'+(x+1)+'y'+(y+1)]);
			}
			if(x-1 >= 0 && y+1 <= yLimit-1) {
				neighbors.push(grid['x'+(x-1)+'y'+(y+1)]);
			}
			if(x+1 <= xLimit-1 && y-1 >= 0) {
				neighbors.push(grid['x'+(x+1)+'y'+(y-1)]);
			}

			var onCount = 0;
			for(var i = 0, len = neighbors.length; i < len; i++) {
				if(neighbors[i] == 1) {
					onCount++;
				}
			}
			switch(grid['x'+x+'y'+y]) {
				case 1:
					if(onCount == 2 || onCount == 3) {
						newGrid['x'+x+'y'+y] = 1;
					}
					else {
						newGrid['x'+x+'y'+y] = 0;
					}
					break;
				case 0:
					if(onCount == 3) {
						newGrid['x'+x+'y'+y] = 1;
					}
					else {
						newGrid['x'+x+'y'+y] = 0;
					}
					break;
			}
		}
	}
	return newGrid;
}
function display(grid) {
	for(var key in grid) {
		if(grid[key] == 1) {
			$('.'+key).addClass('active');
		}
		else {
			$('.'+key).removeClass('active');
		}
	}
}