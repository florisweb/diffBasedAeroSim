
const Simulator = new class {


	update(_PGrid, _walls, _dt) {
		let PGradGrid = createGrid(World.width + 2, World.height + 2, 0);
		let PArr = gridToArr(_PGrid);
		let WallArr = gridToArr(_walls);

		// Skip the edges, because grad P(wall) := 0
		for (let xi = 1; xi < World.width + 2 - 1; xi++)
		{
			let x = xi - 1;
			for (let yi = 1; yi < World.height + 2 - 1; yi++)
			{
				let y = yi - 1;
				let index = x + y * World.width;
				let wallIndex = xi + yi * (World.width + 2);

				console.log('calc', x, y, WallArr[wallIndex]);
				PGradGrid[xi][yi] = 
									// ((PArr[index - World.width] || 0) + (PArr[index + World.width] || 0)) / 2 + 
										// * WallArr[wallIndex - World.width - 2] y* WallArr[wallIndex + World.width + 2];
									((PArr[index - 1] || 0) + (PArr[index + 1] || 0)) / 2 
										* WallArr[wallIndex - 1] * WallArr[wallIndex + 1];
			}

		}


		let newPGrid = createGrid(World.width, World.height, 0);
		for (let x = 0; x < World.width; x++)
		{
			let xi = x + 1
			for (let y = 0; y < World.height; y++)
			{
				let yi = y + 1 
				let D = 1
				let grad = 	(PGradGrid[xi - 1][yi] + PGradGrid[xi + 1][yi]) / 2 + 
						 	(PGradGrid[xi][yi - 1] + PGradGrid[xi][yi + 1]) / 2
				newPGrid[x][y] = grad * D * _dt
			}
		}
		console.table(newPGrid)

		return newPGrid;
	}
}