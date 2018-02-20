// init dependencies
var express = require('express');
var sql = require('mssql');
var router = express.Router();

// call core functions
var core = require('../../multiple.core.js');

// call sql connection configuration
var config = require('../../multiple.config.js');
console.log(config.setup());
console.log(config.application() + ' [web.sales.js]');


// ------------------------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------ NOTES ----------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------------------------------------------------ //

/*
    When you are using SQL Server 2014 and you've output parameter. ExpressJS doesn't care about output parameter, so it will be treated as input parameter.
    Please remember, ExpressJS can't return output parameter as a table. So, the behavior between ExpressJS and WebService in C# doesn't have similarity.
    If you need an output as a table, you have to select manually at the end of your store procedure.
*/


// ================================================================== GET ROUTER ================================================================== //

router.get('/listitem', function(req, res) {
    // define and prepare table parameter
    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // define parameter output [ununsed]
    core.AddWithParameter(table1, "ReturnStatuss", ""); 
    core.AddWithParameter(table1, "ReturnMessage", ""); 
    core.AddWithParameter(table1, "ReturnUrl", ""); 

    // define parameter input
    core.AddWithParameter(table1, "SessionID", "4739086366429951030807"); 
    core.AddWithParameter(table1, "FormID", "13"); 

    core.AddWithParameter(table1, "Keyword", ""); 
    core.AddWithParameter(table1, "CurrentPage", "1"); 
    core.AddWithParameter(table1, "PageSize", "10"); 

    //execute query
    return core.ExecuteQueryWithParameter1(req, res, 'USP_CMD_M_KPI_List', config, table1);
});

// -----------------------------------------------------------------------------

router.get('/loadsales', function(req, res) {

    //execute query
    return core.ExecuteQueryWithoutParameter1(req, res, 'usp_Test', config);
});

// -----------------------------------------------------------------------------

router.get('/loadsales2', function(req, res) {
    // define and prepare table parameter
    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // define parameter output [ununsed]
    core.AddWithParameter(table1, "ReturnStatus", "");
    core.AddWithParameter(table1, "ReturnMessage", "");
    core.AddWithParameter(table1, "ReturnUrl", "");

    // define parameter input
    core.AddWithParameter(table1, "FormID", "02");   

    //execute query
    return core.ExecuteQueryWithParameter1(req, res, 'usp_Test1', config, table1);
});

// -----------------------------------------------------------------------------

router.get('/loadsales3', function(req, res) {
    // define and prepare table parameter
    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // define parameter output [ununsed]
    core.AddWithParameter(table1, "ReturnStatus", "");
    core.AddWithParameter(table1, "ReturnMessage", "");
    core.AddWithParameter(table1, "ReturnUrl", "");

    // define parameter input
    core.AddWithParameter(table1, "FormID", "03");

    //execute query
    return core.ExecuteQueryWithParameter1(req, res, 'usp_Test1', config, table1);
});


// ================================================================== POST ROUTER ================================================================== //

// { "FormID": 1, "Name": 'Simon' }
// { FormID: 1, Name: 'Simon' }

router.post('/submitSales', function(req, res) {
    // define and prepare table parameter
    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // parse json to object
    var obj = JSON.parse(req.body.id);

    // define parameter
    core.AddWithParameter(table1, "FormID", obj.formid);
    core.AddWithParameter(table1, "Name", obj.name);

    //execute query
    return core.ExecuteQueryWithParameter1(req, res, 'usp_Test2', config, table1);
});

// -----------------------------------------------------------------------------

router.post('/submitSalesMultiple', function(req, res) {
    // define and prepare table parameter
    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // parse json to object
    var obj = JSON.parse(req.body.id);
    var arr1 = obj.array;

    // define table when using user defined table (UDT)
    const table2 = new sql.Table();
    core.PrepareUDTParameter(table2, arr1);

    // define parameter
    core.AddWithParameter(table1, "SessionID", obj.sessionid);
    core.AddWithParameter(table1, "tbl_Sales", table2);

    //execute query
    return core.ExecuteQueryWithParameterArray1(req, res, 'usp_Test3', config, table1, table2);
});

// -----------------------------------------------------------------------------

module.exports = router;