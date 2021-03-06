var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var lights = data.split('\n'),
		turn = 100;

	if (part == 2) {
		lights = _.map(lights, function(line, i) {
			// ignore grids that smaller than 3x3
			if (i == 0 || i == lights.length - 1) {
				return line.replace(/^.(.+).$/, '#$1#');
			} else {
				return line;
			}
		});
	}

	while (turn--) {
		lights = next(lights, part);
	}

	// count
	var count = 0;
	for (var i = 0; i < lights.length; i++) {
		for (var j = 0; j < lights[i].length; j++) {
			if (lights[i][j] == '#') count++;
		}
	}
	console.log(count);
}

function next(lights, part) {
	return _.map(lights, function(line, i) {
		var after = [], count;
		for (var j = 0; j < line.length; j++) {
			if (part == 2 && ((i == 0 && j == 0)
					|| (i == 0 && j == line.length - 1)
					|| (i == lights.length - 1 && j == line.length - 1)
					|| (i == lights.length - 1 && j == 0)))
					 {
				after.push('#');
				continue;
			}

			count = countNeighbors(lights, i, j);
			if (line[j] == '#') {
				after.push(count != 2 && count != 3 ? '.' : '#');
			} else {
				after.push(count == 3 ? '#' : '.');
			}
		}
		return after;
	});
}
function countNeighbors(lights, i, j) {
	var result = 0;
	if (i != 0) {
		// the previous row
		if (j != 0 && lights[i-1][j-1] == '#') result++;
		if (j != lights[i].length - 1 && lights[i-1][j+1] == '#') result++;
		if (lights[i-1][j] == '#') result++;
	}
	if (i != lights.length - 1) {
		// the next row
		if (j != 0 && lights[i+1][j-1] == '#') result++;
		if (j != lights[i].length - 1 && lights[i+1][j+1] == '#') result++;
		if (lights[i+1][j] == '#') result++;
	}
	// the current row
	if (j != 0 && lights[i][j-1] == '#') result++;
	if (j != lights[i].length - 1 && lights[i][j+1] == '#') result++;

	return result;
}
