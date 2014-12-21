document.getElementById('getStarted').addEventListener('click', function(){
	document.getElementById('outputBox').innerHTML = '';
	document.getElementById('input').value = '';
});

document.getElementById('growButton').addEventListener('click', showGrowth);

var seasonChecker = function(height, season){
	if (season === 0){
		height = 1;
	}
	else if (season % 2 === 1) {
		height *= 2;
	}
	else if (season % 2 === 0) {
		height += 1;
	}
	return height;
}

function grow() {
	var input = document.getElementById('input');
	var output = document.getElementById('outputBox');
	var splitInput = input.value.split('\n');
	var blankSpaces = 0;
	for(var i = 0; i < splitInput.length; i++) {
		if(splitInput[i] == ''){
			blankSpaces += 1
		}
	}
	if (blankSpaces > 0) {
		output.innerHTML = '<p class="bg-danger">You appear to have ' + blankSpaces + ' blank space(s)!</p>';
		event.preventDefault();
		return;
	}
	if(splitInput.length > 11 || splitInput[0] < 0 || splitInput[0] > 10){
		output.innerHTML = '<p class="bg-danger">T must be between 1 and 10!</p>';
		event.preventDefault();
		return;
	}
	if (splitInput.length - 1 != splitInput[0]){
		output.innerHTML = '<p class="bg-danger">Your number of lines does not match your T value!</p>';
		event.preventDefault();
		return;
	}

	for(var i = 0; i < splitInput.length; i++) {
		if(i > 0 && (splitInput[i] < 0 || splitInput[i] > 60)){
			output.innerHTML = '<p class="bg-danger">N must be between 0 and 60!</p>';
			event.preventDefault();
			return;
		}
		if(splitInput[i].length > 2) {
			output.innerHTML = '<p class="bg-danger">Only one number per line!</p>';
			event.preventDefault();
			return;
		}
	}


	var T = splitInput[0];
	var N = splitInput.slice(1,11);
	var finalHeights = []
	for (nIndex=0; nIndex < N.length; nIndex++) {
		nSize = N[nIndex]
		var height = 1;
		for (j=1; j <= nSize; j++){
			var height = seasonChecker(height, j);
		}
			finalHeights.push(height);
	}
	return finalHeights;
}

function showGrowth() {
	var output = document.getElementById('outputBox');
	var input = document.getElementById('input');
	var splitInput = input.value.split('\n');
	output.innerHTML = ''
	for (i=0; i < grow().length; i++){
		output.innerHTML += 'N value of ' + splitInput[i+1] + ' gives ' + grow()[i] + '<br />';
	}	
}