// A Javascript program for Dijkstra's single
// source shortest path algorithm.
// The program is for adjacency matrix
// representation of the graph	
let V = 8;

// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist,sptSet)
{
	
	// Initialize min value
	let min = Number.MAX_VALUE;
	let min_index = -1;
	
	for(let v = 0; v < V; v++)
	{
		if (sptSet[v] == false && dist[v] <= min)
		{
			min = dist[v];
			min_index = v;
		}
	}
	return min_index;
}

// A utility function to print
// the constructed distance array
function printSolution(dist)
{
	console.log("Vertex \t\t Distance from Source<br>");
	for(let i = 0; i < V; i++)
	{
		console.log(i + " \t\t " +
				dist[i] + "<br>");
	}
}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src)
{
	let dist = new Array(V);
	let sptSet = new Array(V);
	
	// Initialize all distances as
	// INFINITE and stpSet[] as false
	for(let i = 0; i < V; i++)
	{
		dist[i] = Number.MAX_VALUE;
		sptSet[i] = false;
	}
	
	// Distance of source vertex
	// from itself is always 0
	dist[src] = 0;
	
	// Find shortest path for all vertices
	for(let count = 0; count < V - 1; count++)
	{
		
		// Pick the minimum distance vertex
		// from the set of vertices not yet
		// processed. u is always equal to
		// src in first iteration.
		let u = minDistance(dist, sptSet);
		
		// Mark the picked vertex as processed
		sptSet[u] = true;
		
		// Update dist value of the adjacent
		// vertices of the picked vertex.
		for(let v = 0; v < V; v++)
		{
			
			// Update dist[v] only if is not in
			// sptSet, there is an edge from u
			// to v, and total weight of path
			// from src to v through u is smaller
			// than current value of dist[v]
			if (!sptSet[v] && graph[u][v] != 0 &&
				dist[u] != Number.MAX_VALUE &&
				dist[u] + graph[u][v] < dist[v])
			{
				dist[v] = dist[u] + graph[u][v];
			}
		}
	}
	
	// Print the constructed distance array
	printSolution(dist);
}

// Driver code
let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
[ 0, 0, 7, 0, 9, 14, 0, 0, 0],
[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
[ 0, 0, 4, 14, 10, 0, 2, 0, 0],
[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ];


const fs = require('fs');
const input = fs.readFileSync('./input.txt');

function buildGrid() {
    let rows = input.toString().split('\n');
    const height = rows.length;
    const width = rows[0].length;
    console.log(rows);
    for (let y = 0; y < height; y++) {
        let graphRow = [];
        for (let x = 0; x < width; x++) {
            // calc char value at point for z
            let z = rows[y][x].charCodeAt(0);
            if( z === 69 ) {
                z = 'z'.charCodeAt(0);
            } else if (z ===83) {
                z = 'a'.charCodeAt(0); 
            };
            graphRow.push(z);
        }
        graph.push(graphRow);
    }
}
// buildGrid();

dijkstra(graph, 0);

// This code is contributed by rag2127
