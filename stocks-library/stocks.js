/*
Stock data library for CSC309 individual project

Created by: Callan Murphy
Date: March 2021
*/

// Global statsLabels array
const statsLabels = ["Open", "Close"];
// TODO - TODO - other statistics not yet working
// const statsLabels = ["High", "Low", "Average", "Open", "Close"];

// Stock constructor
class Stock {
    constructor(ticker, data){
        this.ticker = ticker;
        this.data = data;
        this.stats = [];
    }

    makeChart(){
        // display a chart for the stock data
        displayChart(this);
    }

    makeStats(){
        // create and display stats for the stock data
        createStats(this);

        displayStats(this);
    }
}



/*---------------------------------------------------------*/
/*** Non-DOM functions ***/
/*---------------------------------------------------------*/
function createStats(stock) {
    var i;
    var data = stock.data;
    var stats = stock.stats;
    stats[0] = data[0].y;
    stats[1] = data[data.length - 1].y;

    // TODO - other statistics not yet working
    // stats[0] = max(data);
    // stats[1] = min(data);

    // var sum = 0;
    // for (i = 0; i < data.length; i++){
    //     sum += data[i];
    // }
    // stats[2] = sum / data.length;
    // stats[3] = data[0];
    // stats[4] = data[-1];
    // stock.stats = stats;
}



/*---------------------------------------------------------*/
/*** DOM functions ***/
/*---------------------------------------------------------*/
function displayChart(stock) {
    var i;
	var table = document.createElement('table');
	table.className = 'chart';
    let row = table.insertRow();
    let cell = row.insertCell();
    cell.className = 'chart-header-td';
    cell.colSpan = "2";
    let item = document.createTextNode(stock.ticker)
    cell.appendChild(item);
	
    for (i = 0; i < stock.data.length; i++){
        let row = table.insertRow();
        row.className = 'chart-td';
        
        let cell = row.insertCell();
        cell.className = 'chart-td';
        let item = document.createTextNode(data[i].x)
        let cell2 = row.insertCell();
        cell2.className = 'chart-td';
        let item2 = document.createTextNode("$" + data[i].y)
        cell.appendChild(item);
        cell2.appendChild(item2);
    }
	 
	document.getElementById(stock.ticker + "-chart").appendChild(table);

}

function displayStats(stock) {
    var i;
	var table = document.createElement('table');

    // TODO - determine heading and structure
	// table.className = 'stats';
    // let row = table.insertRow();
    // let cell = row.insertCell();
    // cell.className = 'chart-header-td';
    // cell.colSpan = "2";
    // let item = document.createTextNode(stock.ticker + " Statistics")
    // cell.appendChild(item);
	
    for (i = 0; i < statsLabels.length; i++){
        let row = table.insertRow();
        row.className = 'stats-td';

        let cell = row.insertCell();
        cell.className = 'stats-td';
        let item = document.createTextNode(statsLabels[i])
        let cell2 = row.insertCell();
        cell2.className = 'stats-td';
        let item2 = document.createTextNode(stock.stats[i])
        cell.appendChild(item);
        cell2.appendChild(item2);
    }
	 
	document.getElementById(stock.ticker + "-stats").appendChild(table);

}