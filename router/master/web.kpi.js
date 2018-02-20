var express = require('express');
var sql = require('mssql');
var router = express.Router();

var core = require('../../multiple.core.js');

var config = require('../../multiple.config.js');

console.log(config.setup());
console.log(config.application() + ' [web.kpi.js]');

router.get('/listkpi', function(req, res) {

    const table1 = new sql.Table();
    core.PrepareTableParameter(table1);

    // define parameter output [ununsed]
    core.AddWithParameter(table1, "Page", "1"); 
    core.AddWithParameter(table1, "Row", "10"); 
    core.AddWithParameter(table1, "SortBy", "RowNumber"); 

    // define parameter input
    core.AddWithParameter(table1, "SortDir", "asc"); 
    core.AddWithParameter(table1, "ReturnType", "R"); 

    core.AddWithParameter(table1, "KPI", ""); 
    core.AddWithParameter(table1, "Department", ""); 
    //core.AddWithParameter(table1, "PageSize", "10"); 

    return core.ExecuteQueryWithParameter1(req, res, 'USP_CMD_M_KPI_List', config, table1);
});

module.exports = router;