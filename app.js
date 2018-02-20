
// init dependencies
var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// --------------------------------------------------------- GENERAL VARIABLE  -------------------------------------------------------- //

const port = 8081;

// --------------------------------------------------------- APPLICATION USE ---------------------------------------------------------- //

//set parser limitation
app.use(bodyparser({ limit: '50mb' }));

// //set parser functions for parsing application/json
app.use(bodyparser.json());

// //set parser functions for parsing application/json
app.use(bodyparser.urlencoded({ extended: true }));

// // set up CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// --------------------------------------------------------------- WEB --------------------------------------------------------------- //

// define all web router
let websales = require('./router/sales/web.sales');
//var product = require('./router/product/web.product.js');
//var salesteam = require('./router/salesteam/web.sales-team.js');

let webkpi = require('./router/master/web.kpi');
let webuom = require('./router/master/web.uom');

// implement all web router
app.use('/web/sales', websales);

app.use('/web/kpi', webkpi);
app.use('/web/uom', webuom);

// --------------------------------------------------------------- MOBILE ------------------------------------------------------------ //

// define all web router
var mobilesales = require('./router/sales/mobile.sales.js');
//var product = require('./router/product/web.product.js');
//var salesteam = require('./router/salesteam/web.sales-team.js');

// implement all web router
app.use('/mobile/sales', mobilesales);
//app.use('/product', product);
//app.use('/sales-team', salesteam);

// --------------------------------------------------------------- PORT ------------------------------------------------------------- //

//set up server listen
app.listen(port, function() {
    console.log('Server is running on port ' + port + ' ...');
});