/*
Stocktopia.js
A stock DOM library for CSC309 individual project

Created by: Callan Murphy
Date: March - April 2021
*/

// IIFE setup
// "use strict";

(function(global, document) { 

    function Stocktopia() {
		this.stocks = [];
	}

    Stocktopia.prototype = {

    }

    // Global statsLabels array
    const statsLabels = ["Change ($)", "Change (%)", "Open", "Close", "Range"];

    // Stock object
    class Stock {
        constructor(ticker, exchange, info = _randomData()){
            this.ticker = ticker;
            this.exchange = exchange;
            this.times = [];
            this.prices = [];
            this.stats = [];

            for (var i = 0; i < info.length; i++){
                this.times.push(info[i].x);
                this.prices.push(info[i].y);
            }

            _createStats(this);
        }

        /*---------------------------------------------------------*/
        /*** Edit object functions ***/
        /*---------------------------------------------------------*/

        addData(newTimes, newPrices){
            try{
                if (newTimes.length != newPrices.length) {
                    throw "Error: the array of new times and new prices must be the same length";
                }
            }
            catch(err){
                console.log(err);
                return
            }
            for (var i = 0; i < newTimes.length; i++){
                this.times.push(newTimes[i]);
                this.prices.push(newPrices[i].y);
            }
            _createStats(this);
        }


        chart(id = this.ticker + "-chart", colour){             // display a chart for the stock data
            if (id == null) id = this.ticker + "-chart";
            _displayChart(this, id, colour);
        }

        table(id = this.ticker + "-table", colour){     // display a table for the stock data
            if (id == null) {id = this.ticker + "-table"};
            _displayTable(this, id, colour);
        }
    }

    /*---------------------------------------------------------*/
    /*** Helper functions ***/
    /*---------------------------------------------------------*/

    // formats price and percent changes with the appropriate symbols, returning a string
    function _priceChangeFormat(num, type) {
        if (num < 0){
            if (type === "%"){
                return num.toFixed(2) + "%";
            } else {
                return "-$" + Math.abs(num).toFixed(2);
            }
        } else {
            if (type === "%"){
                return "+" + num.toFixed(2) + "%";
            } else {
                return "+$" + num.toFixed(2);
            }
        }
    }

    // returns a DOM element at a given ID with error checking
    function _getID(id) {
        element = document.getElementById(id)
        try {
            if (!element) {
                throw "Error: no HTML element exists with id '" + id + "'";
            }
        }
        catch(err) {
            console.log(err)
        }
        return element
    }

    // generates a random float with two decimal places from 1.00 to 101.00
    function _num(){
        return (Math.floor((Math.random() * 100) + 1) + (Math.floor((Math.random() * 99)) / 100)).toFixed(2);
    }

    // generates random time and price data for a stock
    function _randomData(){
        let x = ['10:00','11:00','12:00','13:00','14:00'];
        let y = [_num(), _num(), _num(), _num(), _num()];
        let data = [
            { x: x[0], y: y[0]},
            { x: x[1], y: y[1]},
            { x: x[2], y: y[2]},
            { x: x[3], y: y[3]},
            { x: x[4], y: y[4]}
        ]
        return data;
    }



    /*---------------------------------------------------------*/
    /*** Non-DOM functions ***/
    /*---------------------------------------------------------*/

    function _createStats(stock) {
        var data = stock.prices;
        var stats = stock.stats;

        // Calculate High, Low and Sum
        var high = parseFloat(data[0]);
        var low = parseFloat(data[0]);

        for (var i = 0; i < data.length; i++){
            if (parseFloat(data[i]) > high){
                high = parseFloat(data[i]);
            } else if (parseFloat(data[i]) < low){
                low = parseFloat(data[i]);
            }
        }

        stats[0] = _priceChangeFormat(data[data.length - 1] - data[0]);           // $ Change
        stats[1] = _priceChangeFormat((data[data.length - 1] / data[0] - 1)*100, "%"); // % Change
        stats[2] = "$" + data[0];                         // Open
        stats[3] = "$" + data[data.length - 1];           // Close
        stats[4] = "$" + low.toFixed(2) + " - " + "$" + high.toFixed(2);        // Day Range
    }



    /*---------------------------------------------------------*/
    /*** DOM functions ***/
    /*---------------------------------------------------------*/

    function _displayTable(stock, id, colour) {
        var table = document.createElement('table');
        table.className = 'stocktopia-table';
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.className = 'stocktopia-table-header-td';
        cell.colSpan = "4";
        cell.style.backgroundColor = colour;
        let item = document.createTextNode(stock.ticker + " (" + stock.exchange + ")")
        cell.appendChild(item);
        
        for (var i = 0; i < stock.prices.length; i++){
            let row = table.insertRow();
            row.className = 'stocktopia-table-td';

            // times and prices
            
            let cell = row.insertCell();
            cell.className = 'stocktopia-table-td';
            let item = document.createTextNode(stock.times[i])
            let cell2 = row.insertCell();
            cell2.className = 'stocktopia-table-td';
            let item2 = document.createTextNode("$" + stock.prices[i])

            cell.appendChild(item);
            cell2.appendChild(item2);

            // stats

            let cell3 = row.insertCell();
            cell3.className = 'stocktopia-table-td';
            let item3 = document.createTextNode(statsLabels[i])
            let cell4 = row.insertCell();
            cell4.className = 'stocktopia-table-td';
            let item4 = document.createTextNode(stock.stats[i])

            cell3.appendChild(item3);
            cell4.appendChild(item4);
        }

        try {
            _getID(id).appendChild(table)
        }
        catch (err) {
            console.log(err);
        }

    }

    function _displayChart(stock, id, colour) {
        // referenced https://codepen.io/AdamBlum/pen/hIKnm and https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197
        try {
            _getID(id).title = stock.ticker
        }
        catch (err) {
            console.log(err);
        }
        var container = document.getElementById(id);
        var title = document.createElement('h3');
        title.innerHTML = stock.ticker + " (" + stock.exchange + ")";
        title.className = 'stocktopia-chart-title';
        var chart = document.createElement('canvas');
        chart.width = 450;
        chart.height = 200;
        var ctx = chart.getContext("2d");


        ctx.translate(0, chart.height);
        ctx.scale(1, -1);

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, chart.width, chart.height);

        var high = parseFloat(stock.prices[0]);
        var low = parseFloat(stock.prices[0]);

        for (var i = 0; i < stock.prices.length; i++){
            if (parseFloat(stock.prices[i]) > high){
                high = parseFloat(stock.prices[i]);
            } else if (parseFloat(stock.prices[i]) < low){
                low = parseFloat(stock.prices[i]);
            }
        }

        var left = 20;
        var last = parseInt(stock.prices[0] - low + 10);
        var move_by = (chart.width - (chart.width / 10) * 2) / stock.prices.length;

        // var range = parseInt((high - low).toFixed(0));

        for(i in stock.prices) {
            var price = parseInt(stock.prices[i] - low + 50);
            // console.log(price);
            ctx.beginPath();
            ctx.moveTo(left, last);
            ctx.lineTo(left + move_by, price);
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.scale(1, -1);
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            if (i == 0){
                ctx.fillText(stock.prices[i], 20, -price);
            }
            ctx.fillText(stock.times[i], -(-left - move_by + 10), -20);
            ctx.scale(1, -1);
        
            if (!colour) {
                if (price < (stock.prices[i-1] - low + 50)) { ctx.strokeStyle = 'red'; } 
                else { ctx.strokeStyle = 'green'; }
            } else {
                ctx.strokeStyle = colour;
            }
            if (i > 0){
                ctx.stroke();
            }
            left += move_by;
            last = price;

        }

        try {
            chart.classList.add('stocktopia-chart');
            title.classList.add('center');
            container.appendChild(title);
            container.appendChild(chart);
        }
        catch (err) {
            console.log(err);
        }
    }

    global.Stocktopia = global.Stocktopia || Stocktopia
    global.Stock = global.Stock || Stock
})(window, window.document);