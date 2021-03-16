/*
Stock data library for CSC309 individual project

Created by: Callan Murphy
Date: March 2021
*/

// let x = ['10:00','11:00','12:00','1:00','2:00'];
// let y = [339.54, 342.33, 356.93, 324.21,298.25];

// let data = [
//     { x: x[0], y: y[0]},
//     { x: x[1], y: y[1]},
//     { x: x[2], y: y[2]},
//     { x: x[3], y: y[3]},
//     { x: x[4], y: y[4]}
// ]

class Stock {
    constructor(ticker, data){
        this.ticker = ticker;
        this.data = data;
    }
}

function newChart(stock) {
    var i, j;
	var table = document.createElement('table');
	// stock.className = "chart";
    let row = table.insertRow();
    let cell = row.insertCell();
    let item = document.createTextNode('Time')
    let cell2 = row.insertCell();
    let item2 = document.createTextNode('Price ($)')
    cell.appendChild(item);
    cell2.appendChild(item2);
	for (i = 0; i < stock.data.length; i++){
        let row = table.insertRow();
        // for (j = 0; j < 2; j++){
            let cell = row.insertCell();
            let item = document.createTextNode(data[i].x)
            let cell2 = row.insertCell();
            let item2 = document.createTextNode(data[i].y)
            cell.appendChild(item);
            cell2.appendChild(item2);
        // }
    }
	 
	document.getElementById("data").appendChild(table);

}