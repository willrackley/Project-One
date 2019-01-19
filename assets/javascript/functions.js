/*
Developers: Natosha, Will Rackley, Justas Lauzinskas
Title: Complete Welness Coach
Descreption: Georgia Tech Bootcamp: Project 1
Date: 2019-01-10
*/

var achieveGoal; // To save users goal globaly
var prodChoices = []; // Store products from USDA
var totalCounted = 0; // Total products count from USDA
var userInput; // To save product name during search (typing)

// ------------- USDA API Settings -------------
var foodApiKey = "rMQ7M66s5OQxDWwDt3XXLIJQEjVxE1JHOGpKvq7r";
var productName = "";
var dataSource = "Standard+Reference";
var queryURL = "https://api.nal.usda.gov/ndb/search/?offset=150&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;

// ------------- HEALTHY PRODUCT IDs PICKED FROM USDA WEBSITE -------------
var breakfastCarbs = ["18064", "18968", "20020", "20067", "08122"];
var breakfastFat = ["16097", "12220", "09039"];
var breakfastProtein = ["01123", "01130", "07026"];
var lunchCarbs = ["18065", "20320", "20089", "11514", "	20137"];
var lunchFat = ["09038", "09038", "01040", "01133", "12006"];
var lunchProtein = ["05305", "01284", "05306", "15271", "06120"];
var dinnerCarbs = ["45067729", "20133", "18042", "20137", "09252"];
var dinnerFat = ["09038", "09195", "15077", "15012", "43261"];
var dinnerProtein = ["36013", "15269", "15270", "15271", "15262", "35016"];
var snacks = ["09040", "25059", "18051", "12061", "09038", "01284", "25071"];

// Function to calculate each meals calories and prepare table for DOM
function usersGoalConversion(calsToAchieve) {
    var dailyMealCal = [];
    var usersDailyCalories = calsToAchieve; // From database users goal, (calories)

    // ------------- CALCULATING AND PUSHING DAILY CALORIES -------------
	dailyMealCal.push(usersDailyCalories * 0.35); // Breakfast 35%
	dailyMealCal.push(usersDailyCalories * 0.05); // Snack 5%
	dailyMealCal.push(usersDailyCalories * 0.30); // Lunch 30%
	dailyMealCal.push(usersDailyCalories * 0.05); // Snack 5%
    dailyMealCal.push(usersDailyCalories * 0.25); // Dinner 25%

    Math.floor(Math.random() * breakfastCarbs.length)

    // ------------- CALL to Calculate Nutritions For Each Meal -------------
	addToTable(breakfastCarbs[Math.floor(Math.random() * breakfastCarbs.length)], "Breakfast", dailyMealCal[0], "carbs");
	addToTable(breakfastFat[Math.floor(Math.random() * breakfastFat.length)], "Breakfast", dailyMealCal[0], "fat");
    addToTable(breakfastProtein[Math.floor(Math.random() * breakfastProtein.length)], "Breakfast", dailyMealCal[0], "protein");
    
    addToTable(snacks[Math.floor(Math.random() * snacks.length)], "SnackOne", dailyMealCal[1], "protein");
    
	addToTable(lunchCarbs[Math.floor(Math.random() * lunchCarbs.length)], "Lunch", dailyMealCal[2], "carbs");
	addToTable(lunchFat[Math.floor(Math.random() * lunchFat.length)], "Lunch", dailyMealCal[2], "fat");
    addToTable(lunchProtein[Math.floor(Math.random() * lunchProtein.length)], "Lunch", dailyMealCal[2], "protein");

    addToTable(snacks[Math.floor(Math.random() * snacks.length)], "SnackTwo", dailyMealCal[3], "protein");
    
	addToTable(dinnerCarbs[Math.floor(Math.random() * dinnerCarbs.length)], "Dinner", dailyMealCal[4], "carbs");
	addToTable(dinnerFat[Math.floor(Math.random() * dinnerFat.length)], "Dinner", dailyMealCal[4], "fat");
	addToTable(dinnerProtein[Math.floor(Math.random() * dinnerProtein.length)], "Dinner", dailyMealCal[4], "protein");
}

// Function to append calculated information of product to table
function printToPage(mealName, response, productCount) {
	var row = $("<tr>");
	row.appendTo("#" + mealName);
	$("<td>" + response.report.foods[0].name + "</td>").appendTo(row);
	$("<td>" + response.report.foods[0].measure + "</td>").appendTo(row);
	$("<td>" + productCount + "</td>").appendTo(row);
	$("<td>" + Math.round(productCount * response.report.foods[0].nutrients[0].value) + "</td>").appendTo(row); // Calories
	$("<td>" + Math.round(productCount * response.report.foods[0].nutrients[4].value) + "</td>").appendTo(row); // Carbs
	$("<td>" + Math.round(productCount * response.report.foods[0].nutrients[3].value) + "</td>").appendTo(row); // Fat
	$("<td>" + Math.round(productCount * response.report.foods[0].nutrients[2].value) + "</td>").appendTo(row); // Protein
}

// Function to calculate product count, calories and other nutrition information
function addToTable(productId, mealName, dailyCalsIntake, nutrition) {
	var queryURL = "https://api.nal.usda.gov/ndb/nutrients/?max=1&nutrients=208&nutrients=269&nutrients=204&nutrients=205&nutrients=203&ndbno=" + productId + "&api_key=" + foodApiKey;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
        // For each meal we have to have different ammounts of nutritions
		var mealCarbsIntake = 0;
		var mealFatIntake = 0;
        var mealProteinIntake = 0;
        // Breakfast is most important meal of the day, CARBS = ENERGY, we need ENERGY 60%
		if (mealName === "Breakfast") {
			mealCarbsIntake = 0.6;
			mealFatIntake = 0.25;
            mealProteinIntake = 0.15;
        // Lunch is important, but get less calories from carbs 50%
		} else if (mealName === "Lunch") {
			mealCarbsIntake = 0.5;
			mealFatIntake = 0.25;
            mealProteinIntake = 0.25;
        // Dinner, we don't need a lot of ENERGY (carbs) 35%
		} else if (mealName === "Dinner"){
			mealCarbsIntake = 0.35;
			mealFatIntake = 0.25;
			mealProteinIntake = 0.4;
        } else { // Snacks
            mealProteinIntake = 1;
        }

        // Calculate actual calories for each nutrition and print to table
		if (nutrition === "carbs") {
            var carbs = dailyCalsIntake * mealCarbsIntake;
			var productCount = Math.round((carbs / response.report.foods[0].nutrients[0].value) * 2) / 2;
			printToPage(mealName, response, productCount);
		} else if (nutrition === "fat") {
			var fat = dailyCalsIntake * mealFatIntake;
			var productCount = Math.round((fat / response.report.foods[0].nutrients[0].value) * 2) / 2;
			printToPage(mealName, response, productCount);
		} else {
			var protein = dailyCalsIntake * mealProteinIntake;
			var productCount = Math.round((protein / response.report.foods[0].nutrients[0].value) * 2) / 2;
			printToPage(mealName, response, productCount);
		}
	});
}

// Function to get and store products from USDA API
function getProducts() {
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		var totalProducts = response.list.total;
		for (i = 0; i < 150; i++) {
			if (response.list.item[i].name.length < 40) {
				prodChoices.push(response.list.item[i].name);
			}
			totalCounted++;
			if (totalProducts === totalCounted) {
				break;
			}
		}
		if (totalProducts > totalCounted) {
			queryURL = "https://api.nal.usda.gov/ndb/search/?" + "&offset=" + totalCounted + "&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;
			getProducts();
		}
	});
}
// Function to find product nutritions by product ID and display info
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

function selectRecepies (url) {
    $.ajax({
        url: url,
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
    $("#recipeContainer").show();
}