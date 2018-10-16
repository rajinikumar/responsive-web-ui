var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1SlGV6U4dSCFmaw_BTHLPCrZYRnB6xFGoT83rDuqK8sA');
//personal Email

router.get('/', function(req, res, next) {
	var opts = {
		'min-col': 1,
		'max-col': 1,
		'min-row': 2,
		'return-empty': false
	};
	var result = {};

	doc.getCells(1, opts, function(err, cells) {
		if (err) {
			console.log(err);
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
});

module.exports = router;