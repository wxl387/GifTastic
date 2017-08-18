var animals=["cat", "dog", "rabbit"];

function displayAnimal() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4b98921f9cb7415a89ed0b84a1236043&q=" + animal;
	$.ajax ( {
		url: queryURL,
		method:"GET"
	}).done(function(response) {
		console.log(response);
		var animalDiv = $("<div class='animal'>");
		var rating;
		var pOne;
		var imgURL;
		var image;

		for (var i=0; i<response.data.length; i++) {
			
			rating = response.data[i].rating;
			pOne = $("<p>").text("Rating: " + rating);
			animalDiv.append(pOne);

			imgURL = response.data[i].images.downsized_medium.url;
			image = $("<img>").attr("src", imgURL);
			animalDiv.append(image);

			$("#animalView").prepend(animalDiv);
		}
	});
}

function renderButtons() {
	$("#btnView").empty();

	for (var i=0; i<animals.length; i++) {
		var a = $("<button>");

		a.addClass("animal");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#btnView").append(a);
	}
}

$("#addAnimal").on("click", function(event) {
	event.preventDefault();

	var animal = $("animalInput").val().trim();

	animals.push(animal);

	renderButtons(); 
})

$(document).on("click", ".animal", displayAnimal);

renderButtons();

