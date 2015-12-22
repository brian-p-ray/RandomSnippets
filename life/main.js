var func;
// if you set the grid to larger than 50x50, it takes more time
// to execute than the delay in the setInterval function.
// at 50x50, the execution time of process is between 79 and 95 milliseconds
var xLimit = 50;
var yLimit = 50;
var grid = new Array();

// create table
var output = '<table>';

for(var y = 0; y < yLimit; y++) {
	output += '<tr>';
	for(var x = 0; x < xLimit; x++) {
		output += '<td class="x'+x+'y'+y+'"></td>'
	}
	output += '</tr>';
}
output += '</table>'
$('body').append(output);

for(var x = 0; x < xLimit; x++) {
	for(var y = 0; y < yLimit; y++) {
		grid['x'+x+'y'+y] = 0;
	}
}

$('td').on('click', function(){
	var cellClass = $(this).attr('class');
	grid[cellClass] = grid[cellClass] == 1 ? 0 : 1;
	$(this).toggleClass('active');
});

// var shape = new Array('x2y1', 'x3y2', 'x1y3', 'x2y3', 'x3y3'); // glider
// var shape = new Array('x25y24','x24y25','x25y25','x26y25','x25y26'); // flashing star
// var length = shape.length;
// for(var i = 0; i < length; i++) {
// 	grid[shape[i]] = 1;
// }

// process(grid);
// display(grid);

function run() {
	func = setInterval(function(){
		grid = process(grid);
		display(grid);
	},100);
}

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