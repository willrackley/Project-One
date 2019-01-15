
/*
Developers: Natosha, Will Rackley, Justas Lauzinskas
Title: Complete Welness Coach
Descreption: Georgia Tech Bootcamp: Project 1
Date: 2019-01-10
*/


$(document).ready(function(){
  

$("#moreInfoFormContainer").hide();
//this click event is for the 'what is your goals form

$("#goalsGoButton").on("click", function() {
	event.preventDefault();
	$("#moreInfoFormContainer").fadeIn(2000);
});
var foodApiKey = "rMQ7M66s5OQxDWwDt3XXLIJQEjVxE1JHOGpKvq7r";
var productName = "";
var dataSource = "Standard+Reference";
var prodChoices = [];
var queryURL = "https://api.nal.usda.gov/ndb/search/?offset=150&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;

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
	var queryURL = "https://api.nal.usda.gov/ndb/nutrients/?max=1&nutrients=208&ndbno=" + productId + "&api_key=" + foodApiKey;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response.report.foods[0]);
	});
}
// Input Autocomplete by product name
$('input[name="q"]').autoComplete({
	minChars: 2,
	source: function(term, suggest) {
		term = term.toLowerCase();
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
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response.list.item[0].ndbno);
		getNutrition(response.list.item[0].ndbno);
	});
});

getProducts();
  
$("#goalsGoButton").on("click", function(){
    event.preventDefault();
    $("#moreInfoFormContainer").fadeIn(2000);
});


});    
