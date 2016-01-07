$('#volumeConvertButton').on('click', function(){
	var fromMeasurement = $('#volumeFrom').val();
	var toMeasurement = $('#volumeTo').val();
	var fromVal = $('#volumeFromVal').val();
	var $to = $('#volumeToVal');

	if(!fromMeasurement || !toMeasurement || !fromVal) {
		return false;
	}
	var fromDivisors = getDivisors(fromMeasurement*fromVal);
	var toDivisors = getDivisors(toMeasurement);
	var divisors = getHighestCommonDivisor(fromDivisors, toDivisors);
	var divisor = divisors.sort(compareNumbers).reverse()[0];
	$to.val(getFraction(fromMeasurement*fromVal, toMeasurement, divisor));
});

$('#weightConvertButton, #lengthConvertButton').on('click', function(){
	postConversion($(this).data('type'));
});

function postConversion(type) {
	var fromMeasurement = $('#'+type+'From').val();
	var toMeasurement = $('#'+type+'To').val();
	var fromVal = $('#'+type+'FromVal').val();
	var $to = $('#'+type+'ToVal');

	var fromValue = fromMeasurement * fromVal;
	$to.val(fromValue / toMeasurement);
}

function getDivisors(num) {
	var arr = new Array();

	for(var i = 1; i <= num; i++) {
		if(num%i == 0) {
			arr.push(i);
		}
	}
	return arr;
}
function getHighestCommonDivisor(arr1, arr2) {
	var a1 = arr1;
	var a2 = arr2;
	if(arr2.length > arr1.length) {
		a1 = arr2;
		a2 = arr1;
	}
	var ret = new Array();
	for(var i = 0; i < a1.length; i++) {
		if(a2.indexOf(a1[i]) !== -1) {
			ret.push(a1[i]);
		}
	}
	return ret;
}

function compareNumbers(a, b) {
	return a - b;
}
function getFraction(num1, num2, divisor) {
	if(!Number.isInteger(num1)) {
		return 'cannot compute';
	}

	if(num1 < num2) {
		return num1/divisor + '/' + num2/divisor;
	}
	else {
		var num = parseInt(num1/num2, 10);

		if(num1%num2 != 0) {
			return num + ' ' + getFraction(num1 - (num2*num), num2, divisor);
		}
		return num;
	}
}
