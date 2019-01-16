
/*
Developers: Natosha, Will Rackley, Justas Lauzinskas
Title: Complete Welness Coach
Descreption: Georgia Tech Bootcamp: Project 1
Date: 2019-01-10
*/


$(document).ready(function(){
  

$("#moreInfoFormContainer").hide();
$("#nutritionFactsContainer").hide();
$("#recipeContainer").hide();

//this click event is for the 'what is your goals form
$("#goalsGoButton").on("click", function() {
	event.preventDefault();
	//if user chooses get healthier then they are redirected to nutrition page
	if($("#goalsDropDown option:selected").text() === "Eat Healthier"){
		window.location.replace("nutrition.html");
	}
	
	$("#moreInfoFormContainer").fadeIn(2000);
});
var foodApiKey = "rMQ7M66s5OQxDWwDt3XXLIJQEjVxE1JHOGpKvq7r";
var productName = "";
var dataSource = "Standard+Reference";
var prodChoices = [];
var queryURL = "https://api.nal.usda.gov/ndb/search/?offset=150&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;
var userInput;

// Function to get all products names localy from API to prepare autocomplete input.
function getProducts() {
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		var totalProducts = response.list.total;
		for (i = 0; i < 150; i++) {
			prodChoices.push(response.list.item[i].name);
			if (totalProducts === prodChoices.length) {
				break;
			}
		}
		if (totalProducts > prodChoices.length) {
			queryURL = "https://api.nal.usda.gov/ndb/search/?" + "&offset=" + prodChoices.length + "&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;
			getProducts();
		}
	});
}
// Function to find product nutritions by product ID
function getNutrition(productId) {
	var queryURL = "https://api.nal.usda.gov/ndb/nutrients/?max=1&nutrients=208&nutrients=269&nutrients=204&nutrients=205&nutrients=203&ndbno=" + productId + "&api_key=" + foodApiKey;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response.report.foods[0]);
		$("#nutritionTitle").text(response.report.foods[0].name);
		$("#nutritionServing").text("Serving Size:  " + response.report.foods[0].measure);
		$("#nutritionCalories").text("Calories:  " + response.report.foods[0].nutrients[0].gm);
		$("#nutritionFat").text("Total Fat:  " + response.report.foods[0].nutrients[3].gm + "g");
		$("#nutritionCarbs").text("Total Carbohydrate : " + response.report.foods[0].nutrients[4].gm + "g");
		$("#nutritionSugars").text("Sugars:  " + response.report.foods[0].nutrients[1].gm + "g");
		$("#nutritionProtein").text("Protein:  " + response.report.foods[0].nutrients[2].gm + "g");
	});
}
// Input Autocomplete by product name
$('input[name="q"]').autoComplete({
	minChars: 6,
	source: function(term, suggest) {
		term = term.toLowerCase();
		userInput = term;
		var matches = [];
		for (i = 0; i < prodChoices.length; i++)
			if (~prodChoices[i].toLowerCase().indexOf(term)) matches.push(prodChoices[i]);
		suggest(matches);
	}
});
// Event Listener when Submit is clicked
$("#submit-product").on("click", function() {
	
	var usersProduct = $("#enter-product").val().trim();
	
	console.log(usersProduct);
	var queryURL = "https://api.nal.usda.gov/ndb/search/?max=1&q=" + usersProduct + "&api_key=" + foodApiKey + "&ds=" + dataSource;
	console.log(userInput);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response.list.item[0].ndbno);
		getNutrition(response.list.item[0].ndbno);
	});
	

	//recipe api
	$.ajax({
		url: "https://api.edamam.com/search?q=" + userInput + "&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3",
		method: "GET"
		
	}).then(function(recipeResponse) {
		
		console.log(recipeResponse);
		
		$("#firstRecipeCardImg").attr("src", recipeResponse.hits[0].recipe.image);
		$("#firstRecipeCardTitle").text(recipeResponse.hits[0].recipe.label);
		$("#firstRecipeCardDietType").text(recipeResponse.hits[0].recipe.dietLabels);
		$("#firstRecipeCardUrl").attr("href", recipeResponse.hits[0].recipe.url);

		$("#secondRecipeCardImg").attr("src", recipeResponse.hits[1].recipe.image);
		$("#secondRecipeCardTitle").text(recipeResponse.hits[1].recipe.label);
		$("#secondRecipeCardDietType").text(recipeResponse.hits[1].recipe.dietLabels);
		$("#secondRecipeCardUrl").attr("href", recipeResponse.hits[1].recipe.url);

		$("#thirdRecipeCardImg").attr("src", recipeResponse.hits[2].recipe.image);
		$("#thirdRecipeCardTitle").text(recipeResponse.hits[2].recipe.label);
		$("#thirdRecipeCardDietType").text(recipeResponse.hits[2].recipe.dietLabels);
		$("#thirdRecipeCardUrl").attr("href", recipeResponse.hits[2].recipe.url);
		
	});
	$("#nutritionFactsContainer").show();
	$("#recipeContainer").show();
	$("#enter-product").val('');
});

getProducts();
  

});    
