var queryURL = 'https://api.giphy.com/v1/gifs/search?q=cat&api_key=KbESqGhdlXfWMhMZRx7ekPvjdWb4ZgTG&limit=10';
var gifsArray = [];
getGifs('Cat');

// create new button for input
$('#submitButton').on('click', function(){
	$('#alert').hide();
	event.preventDefault();
	input = $('#input').val();
	if (input){
		cleanInput = cleanAndCheckInput(input);
		if (cleanInput){
			queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + cleanInput + '&api_key=KbESqGhdlXfWMhMZRx7ekPvjdWb4ZgTG&limit=10';
			getGifs(cleanInput);
			var newButton = $('<button type="load" class="animalButton btn btn-info m-1"></button>');
			newButton.text(cleanInput);
			$('.buttonsDiv').append(newButton);
			$('#input').val('');
		}
	}
});


// clears #images div and calls showImages()
$(document).on('click', '.animalButton', function(){
	$('#images').empty();
	name = event.srcElement.innerText;
	showImages(name);
});


// creates images and appends them to #images div
function showImages(name){
	for (var i in gifsArray[name]){
		var container = $('<div class="col-s-6 float-left" id=' + i + '></div>');
		var header = $('<h3 class="col-12"></h3>');
		var img = $('<img data="anim"></img>');
		img.attr('src', gifsArray[name][i].anim);
		img.attr('index', i);
		header.text('Rating: ' + gifsArray[name][i].rating);
		container.append(header, img);
		$('#images').append(container);
	}
}

// switches from animated to still img when image is clicked
$(document).on('click', 'img', function(){
	state = $(this).attr('data');
	i = parseInt($(this).attr('index'));
	if (state === 'anim'){
		$(this).attr('data', 'still');
		$(this).attr('src', gifsArray[name][i].still)
	} else {	
		$(this).attr('data', 'anim');
		$(this).attr('src', gifsArray[name][i].anim)
	}
});

// makes Ajax call to get data and pushes to gifArray
function getGifs(animal){
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(response){
		gifsArray[animal] = [];
		for (var i in response.data){	
			gifsArray[animal].push(
				{
					anim: response.data[i].images.original.url,
					still: response.data[i].images.original_still.url,					
					rating: response.data[i].rating
				});
		}
	});
}


// looks for duplicates and cleans format
function cleanAndCheckInput(str){
	animalName = str.toLowerCase();
	keys = Object.keys(gifsArray);
	for (var i in keys){
		if (animalName === keys[i].toLowerCase()){
			$('#alert').show();
			return false;
		}
	}

	var arr = animalName.split('');
	arr[0] = arr[0].toUpperCase();
	animalName = arr.join('');

	return animalName;
}





