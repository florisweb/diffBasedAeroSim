function createGrid(_width, _height, _defaultValue = 0) {
	let grid = [];
	for (let x = 0; x < _width; x++)
	{
		grid[x] = []
		for (let y = 0; y < _height; y++)
		{
			grid[x][y] = _defaultValue
		}
	}
	return grid;
}

function createWorld(_width, _height, _defaultValue = 0) {
	let grid = [];
	for (let x = 0; x < _width; x++)
	{
		grid[x] = []
		for (let y = 0; y < _height; y++)
		{
			grid[x][y] = Math.ceil(Math.random() * 10);
		}
	}
	return grid;
}


function createWalls(_width, _height, _defaultValue = 0) {
	let grid = [];
	for (let x = 0; x < _width; x++)
	{
		grid[x] = []
		for (let y = 0; y < _height; y++)
		{
			grid[x][y] = x === 0 || y === 0 || x === _width - 1 || y === _height - 1 ? 0 : 1;
		}
	}
	return grid;
}

function arrToGrid(_arr, _width) {
	let arr = Object.assign([], _arr);
	let grid = [];
	let rows = Math.floor(_arr.length / _width);

	for (let r = 0; r < rows; r++)
	{
		grid[r] = arr.splice(0, _width);
	}
	return grid;
}

// index = x + y * width
function gridToArr(_grid) {
	let arr = [];
	for (let y = 0; y < _grid[0].length; y++)
	{
		for (let x = 0; x < _grid.length; x++)
		{		
			arr.push(_grid[x][y])
		}
	}
	return arr;
}




const World = new class {
	width = 5;
	height = 5;
	grid = []
	wallGrid = [];

	constructor() {
		this.grid = createWorld(this.width, this.height);
		this.wallGrid = createWalls(this.width + 2, this.height + 2);
	}


	update() {
		console.table(this.grid);
		console.log('--->')
		for (let i = 0; i < 1000; i++) this.grid = Simulator.update(this.grid, this.wallGrid, .01);
		console.table(this.grid)

	}

}

World.update();





