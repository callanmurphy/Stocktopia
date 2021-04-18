/*
JS for Stocktopia.js Website 
A stock DOM library for CSC309 individual project

Created by: Callan Murphy
Date: March - April 2021
*/

// Data setup
let x = ['10:00','11:00','12:00','13:00','14:00'];
let y = [339.54, 342.33, 356.93, 324.21,298.25];
let data = [
    { x: x[0], y: y[0]},
    { x: x[1], y: y[1]},
    { x: x[2], y: y[2]},
    { x: x[3], y: y[3]},
    { x: x[4], y: y[4]}
]

// example 1
aapl = new Stock('AAPL', "NASDAQ", data);
aapl.table();

tsla = new Stock('TSLA', "NASDAQ");
tsla.table("my-table-id", "green");

// example 2
aapl.chart();
tsla.chart(null, "blue");

ac = new Stock('AC', "TSX");
ac.chart(null, "yellow");

mda = new Stock('MDA', "TSX");
mda.chart();
