//Clears textarea upon 'Get Started' button click
document.getElementById('getStarted').addEventListener('click', function(){
	document.getElementById('outputBox').innerHTML = '';
	document.getElementById('input').value = '';
});

document.getElementById('growButton').addEventListener('click', showGrowth);

function showGrowth() {
	var output = document.getElementById('outputBox');
	var input = document.getElementById('input');
	var splitInput = input.value.split('\n');
	//Clear text in output area
	output.innerHTML = '';
	//Place heights passed from grow() into output box
	for (i=0; i < grow().length; i++){
		output.innerHTML += '<br />N value of ' + splitInput[i+1] + ' gives ' + grow()[i];
	}
}

var seasonChecker = function(height, season){
	//Core logic of how Utopian Tree grows
	//If input is 0, height is 1
	if (season === 0){
		height = 1;
	}
	//If spring multiply height by 2
	else if (season % 2 === 1) {
		height *= 2;
	}
	//If summer add 1 to height
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
	//Check for blank spaces
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
	//Check that 1 <= T <= 10
	if(splitInput.length > 11 || splitInput[0] < 0 || splitInput[0] > 10){
		output.innerHTML = '<p class="bg-danger">T must be between 1 and 10!</p>';
		event.preventDefault();
		return;
	}
	//Check that number of N lines equals T
	if (splitInput.length - 1 != splitInput[0]){
		output.innerHTML = '<p class="bg-danger">Your number of lines does not match your T value!</p>';
		event.preventDefault();
		return;
	}
	//Check that 0 <= N <= 60
	//Check that there is only one number per line
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

	//If all above check out then take input and add to T and N sets
	var T = splitInput[0];
	var N = splitInput.slice(1,11);
	var finalHeights = []
	//Over the values in the N set call the seasonChecker function
	for (nIndex=0; nIndex < N.length; nIndex++) {
		nSize = N[nIndex]
		var height = 1;
		//Iterate from 1 to N and pass through seasonChecker function
		for (j=1; j <= nSize; j++){
			var height = seasonChecker(height, j);
		}
		//Once it gets to N, store this value in finalHeights array
			finalHeights.push(height);
	}
	//Return all of the heights for the given N's
	return finalHeights;
}

//Initializes popover in modal
$(function () {
  $('[data-toggle="popover"]').popover()
})