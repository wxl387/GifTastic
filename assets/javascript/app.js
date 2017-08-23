$(document).ready(function(){ 

var animals=["cat", "dog", "rabbit"];

function displayAnimal() {
	$("#animalView").empty();
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4b98921f9cb7415a89ed0b84a1236043&q=" + animal +"&limit=10";
	$.ajax ( {
		url: queryURL,
		method:"GET"
	}).done(function(response) {
		console.log(response);
		var animalDiv = $("<div class='animalGif'>");
		var rating;
		var pOne;
		var imgURL;
		var image;
		var dataState = "still";
		var dataStill;
		var dataAnimate;

		for (var i=0; i<response.data.length; i++) {
			rating = response.data[i].rating;
			pOne = $("<p>").text("Rating: " + rating);
			animalDiv.append(pOne);

			imgURL = response.data[i].images.fixed_height_small_still.url;
			dataStill = response.data[i].images.fixed_height_small_still.url;
			dataAnimate = response.data[i].images.fixed_height_small.url;

			image = $("<img>").attr("src", imgURL);
			image.attr("data-state", dataState);
			image.attr("data-animate", dataAnimate);
			image.attr("data-still", dataStill);
			image.addClass("gif");


			animalDiv.append(image);

			$("#animalView").append(animalDiv);
		}
	});
}

function renderButtons() {
	$("#btnView").empty();

	for (var i=0; i<animals.length; i++) {
		var a = $("<button class='btn btn-default'>");

		a.addClass("animal");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#btnView").append(a);
	}
}

$("#addAnimal").on("click", function(event) {
	event.preventDefault();

	var animal = $("#animalInput").val().trim();

	animals.push(animal);

	renderButtons(); 
});

function gifPlay() {
	var state = $(this).attr("data-state");
			    
	if (state == "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

$(document).on("click", ".animal", displayAnimal);
$(document).on("click", ".gif", gifPlay);

renderButtons();

});
// debugger;