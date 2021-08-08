// load library
// "use strict"; 

// const stocktopia = new Stocktopia()

function home(){
    // document.body.style.backgroundColor = 'rgb(0,212,255)';

    aapl = new Stock('TSLA', "NASDAQ");
    aapl.table();
    aapl.chart();
}

home();