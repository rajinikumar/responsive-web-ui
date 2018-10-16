$(document).ready(function () {
	function getCarDetails(){
		return $.getJson('js/cardata.json');
	}
	function getFuelDetails(){
		return $.getJson('js/fueldata.json');
	}
	function getRegDetails(){
		return $.getJson('js/registrationdata.json');
	}

	function getAllData(){
		var deffered = $.Deferred();
		
		$.when(getCarDetails(), getFuelDetails(), getRegDetails()).done(function(carData, fuelData, regData){
			console.log(carData);
			deffered.resolve(carData);
		})

		return deffered;

	}
	$('#insurance_content').load('views/i2.html', function () {
		console.log("success");

	});

	$('#insurance_content').on('click', '.insuranceButton', function(){
		console.log('raido button clicked');
		getAllData().done(function(data){
			console.log(data);
		});

	})

});