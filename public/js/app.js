$(document).ready(function () {
    
    $('#insurance_content').load('views/insurance.html', function () {

        $('#chk1').on('click', function () {
            $.getJSON('js/cardata.json', function (res) {
                var option = populateOption(res, 'Select car type');
                $('#carType').html(option);
            });

            $.getJSON('js/fueldata.json', function (res) {
                var option = populateOption(res, 'Select fuel type');
                $('#fuelType').html(option);
            });

            $.getJSON('js/registrationdata.json', function (res) {
                var option = populateOption(res, 'Select state');
                $('#registrationState').html(option);
            });
            $('#form1').removeClass('hidden');
        });

        $('#form1').on('submit', function () {
            var errflag = false;
            $(this).find('input, select').closest('.form-group').removeClass('has-error');

            $(this).find('input, select').each(function () {
                var thisElem = $(this);
                console.log(thisElem);
                console.log("---");
                if (thisElem.val() == '') {
                    console.log(thisElem);
                    thisElem.closest('.form-group').addClass('has-error');
                    errflag = true;
                }
            });

            var userName = $('#userName').val();
            var phoneNumber = $('#phoneNumber').val();

            if (userName != '' && (userName.length < 2 || userName.length > 50)) {
                $('#userName').closest('.form-group').addClass('has-error');
                errflag = true;
            }
            if (phoneNumber != '' && phoneNumber.length != 10) {
                $('#phoneNumber').closest('.form-group').addClass('has-error');
                errflag = true;
            }

            if (!errflag) {
                $('#dd_div').removeClass('hidden');
                $('#cardiv').addClass('hidden');
            }
            return false;
        });

        $('#getquote').on('click', function () {

            var data = {};
            data.userName = $('#userName').val();
            data.phoneNumber = $('#phoneNumber').val();
            data.carType = $('#carType').val();
            data.fuelType = $('#fuelType').val();
            data.registrationState = $('#registrationState').val();
            var bankName = $('.seconddiv ul li').attr('data-bank');
            var price = $('.seconddiv ul li').attr('data-price');
            data.price = {
                'bank': bankName,
                'price': price
            };
            console.log(data);

            $.ajax({
                method: 'post',
                data: data,
                url: 'js/getQ.json',
                success: function (res) {
                    $('#res').html('You have successfully raised the bank request:' + res.success);
                    $('#md1').modal();
                },
                error: function (res) {
                    console.log(res);
                }
            });
        });

        //To build the drag and drop LI's
        $.getJSON('js/getQ.json', function (data) {
            var bank = data.bank;
            var li = '';
            for (var i = 0; i < bank.length; i++) {
                li += '<li draggable="true" id=li' + i + ' class="list-group-item" data-bank="' + bank[i].name + '" data-price="' + bank[i].price + '" ondragstart="dragStart(event);" ondrop="return false;" ondragover="return false;">';
                li += '<div class="list-group-item-heading">' + bank[i].name + '</div>';
                li += '<div class="list-group-item-text">' + bank[i].price + '</div>';
                li += '</li>';
            }
            $('.firstdiv ul').html(li);
        });

    });

    function populateOption(response, text) {
        var option = "<option value=''>" + text + "</option>";
        var newData = response.data;
        for (var i = 0; i < newData.length; i++) {
            option += "<option value='" + newData[i] + "'>" + newData[i] + "</option>";
        }
        return option;
    }
});


function dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');

    if (el.closest('.seconddiv') && $('.seconddiv ul li').length == 1) {
        alert('You can select only one bank, please remove the and add a new bank');
    } else {
        el.appendChild(document.getElementById(data));
    }
}