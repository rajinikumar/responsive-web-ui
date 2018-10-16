var express = require('express');
var router = express.Router();
var googleSheet = require('./../syndication-sheet.js');
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1iPgO0cMegucpSpgCeCPIsT3DBcRExb9h_EuG5Ah05Tg');
//Trinity mirror Id


/* GET home page. */
router.get('/', function(req, res, next) {
  var sheet;
  var opts = {
    'min-col': 1,
    'max-col': 1,
    'min-row': 2,
    'return-empty': false
  };

  var result = {};

  doc.getCells(1, opts, function(err, cells) {
    if (err) {
      console.log('<---->');
      console.log(err);
      console.log('---->');
      result.status = 'failure';
      result.error = err;
      res.status(500).json(result);
    } else {
      var imageList = [];
      cells.forEach(function(cell) {
        imageList.push(cell.value);
      });
      result.status = 'success';
      result.data = imageList;
      res.status(200).json(result);
    }
  });
  /*googleSheet.getRegionalImageBlackList().then((rslt) => {
  	res.status(200).json(rslt);
  });*/


});

module.exports = router;