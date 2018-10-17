$(document).ready(function () {

	function getCarDetails() {
		return $.getJSON('js/cardata.json');
	}

	function getFuelDetails() {
		return $.getJSON('js/fueldata.json');
	}

	function getRegDetails() {
		return $.getJSON('js/registrationdata.json');
	}

	function getBankDetails() {
		return $.getJSON('js/getQ.json');
	}

	function getDetails() {
		let deferred = $.Deferred();
		$.when(getCarDetails(), getFuelDetails(), getRegDetails()).done(function (carDetails, fuelDetails, regDetails) {
			let cDetails = generateList(carDetails[0].data);
			$('#carType').append(cDetails);
			let fDetails = generateList(fuelDetails[0].data);
			$('#fuelType').append(fDetails);
			let rDetails = generateList(regDetails[0].data);
			$('#regType').append(rDetails);
			deferred.resolve(carDetails);
		});
		return deferred.promise();
	}

	function generateList(lists) {
		let option = '';
		$.each(lists, function (i, obj) {
			option += `<option value=${obj}>${obj}</option>`;
		})
		return option;
	}
	$('#insurance_content').load('views/i2.html', function () {
		$('#insurance').on('submit', function () {
			console.log("Form submitted");
			errorFlag = false;

			$(this).find('select').each(function () {
				let ele = $(this);
				if (ele.val() == '') {
					ele.closest('.form-group').addClass('has-error');
					errorFlag = true;
				}
			});

			let name = $('#name');
			let phone = $('#phone');
			if (name.val() == '' && name.val().length < 2) {
				$(name).closest('.form-group').addClass('has-error');
				errorFlag = true;
			}
			if (phone.val() == '' && (phone.val().length < 2 || phone.val().length > 10)) {
				$(phone).closest('.form-group').addClass('has-error');
				errorFlag = true;
			}

			if (errorFlag) {
				getBankDetails().done(function (bankDetails) {
					console.log(bankDetails)
					let content = generateBankList(bankDetails.bank);

					$('.bank-content').append(content);
				})
			}
			return false;
		});
	});

	$('#insurance_content').on('click', '.insuranceButton', function () {
		getDetails().done(function (data) {
			console.log(data);
		})
	});

	function generateBankList(lists) {
		let bk = '';
		$.each(lists, function (i, el) {
			bk += `<li dragabble="true"  id=li${i}  class="list-group-item" data-bank=${el.name} data-price="${el.price}" ondragstart="dragStart(event);" ondrop="return false;" ondragover="return false;"><div class="list-group-item-heading">${el.name}</div><div class="list-group-item-text"> ${el.price}</div></li>`;
		})
		console.log(bk);

	//	return bk;

		var bank = lists;
            var li = '';
            for (var i = 0; i < bank.length; i++) {
                li += '<li draggable="true" id=li' + i + ' class="list-group-item" data-bank="' + bank[i].name + '" data-price="' + bank[i].price + '" ondragstart="dragStart(event);" ondrop="return false;" ondragover="return false;">';
                li += '<div class="list-group-item-heading">' + bank[i].name + '</div>';
                li += '<div class="list-group-item-text">' + bank[i].price + '</div>';
                li += '</li>';
			}
			console.log(li);

					return li;
	}

	
});

function dragStart(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev, el) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData('text');
	console.log(data);
	if (el.closest('.my-bank-content') && $('.my-bank-content li').length == 1) {
		alert('You can select only one bank, please remove the and add a new bank');
	} else {
		el.appendChild(document.getElementById(data));
	}
}