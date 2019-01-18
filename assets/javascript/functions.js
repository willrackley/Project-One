var ageBmr=0;
var genderBmr=0;
var weightBmr=0;
var heightBmr=0;
var activityBmr=0;
//not sure if needed as global variables
var convertedFeet=0;
var inches=0;
var calculatedBmr=0;
var caloriesToLoseWeight=0;
var caloriesToGainWeight=0;
var calsToAchieve;
var achieveGoal;
var foodApiKey = "rMQ7M66s5OQxDWwDt3XXLIJQEjVxE1JHOGpKvq7r";
var productName = "";
var dataSource = "Standard+Reference";
var prodChoices = [];
var queryURL = "https://api.nal.usda.gov/ndb/search/?offset=150&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;
var userInput;
var totalCounted = 0;
var totalCalsBreakfast = 0;

var database = firebase.database();


function usersGoalConversion(){
	var breakfastCarbs = ["18064", "18968", "08129", "08120", "08122"];
	var breakfastFat = ["16097"]; 
	var breakfastProtein = ["01123"]; 

	var lunchCarbs = []; 
	var lunchFat = []; 
	var lunchProtein = []; 

	var dinnerCarbs = []; 
	var dinnerFat = []; 
	var dinnerProtein = []; 

	var snacks = ["09040"];


	// suggested foods START
	
	var usersDailyCalories = calsToAchieve; // we have to take this users value from database
	var carbsIntake = usersDailyCalories * 0.60; // 60% of calories carbs
	var fatIntake = usersDailyCalories * 0.25; // 25% of calories fat
	var proteinIntake = usersDailyCalories * 0.15; // 15% of calories protein
	var dailyMealCal = [];

	console.log(calsToAchieve);
	// print to console
	console.log ("to gain weight user has to get " + usersDailyCalories + " cals");
	console.log ("================ users daily intake calories ================ ");
	console.log ("daily carbs intake to gain " + carbsIntake + " cal");
	console.log ("daily fat intake to gain " + fatIntake + " cal");
	console.log ("daily protein intake to gain " + proteinIntake + " cal");


	dailyMealCal.push(usersDailyCalories * 0.35); // breakfast daily cals 35%
	dailyMealCal.push(usersDailyCalories * 0.05); // snack daily cals 5%
	dailyMealCal.push(usersDailyCalories * 0.30); // lunch daily cals 30%
	dailyMealCal.push(usersDailyCalories * 0.05); // snack daily cals 5%
	dailyMealCal.push(usersDailyCalories * 0.25); // dinner daily cals 25%

	console.log(" =========== for breakfast you need " + dailyMealCal[0] + " calories ===========");

	addToTable(breakfastCarbs[1], "Breakfast", dailyMealCal[0], "carbs");
	addToTable(breakfastFat[0], "Breakfast", dailyMealCal[0], "fat");
	addToTable(breakfastProtein[0], "Breakfast", dailyMealCal[0], "protein");
}

// Function to find product nutritions by product ID
function addToTable(productId, mealName, dailyCalsIntake, nutrition) {
    var queryURL = "https://api.nal.usda.gov/ndb/nutrients/?max=1&nutrients=208&nutrients=269&nutrients=204&nutrients=205&nutrients=203&ndbno=" + productId + "&api_key=" + foodApiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        if (nutrition === "carbs") {
            var carbs = dailyCalsIntake * 0.6;
            console.log("you need to get " + carbs + " calories from " + nutrition);
            console.log("Selected product: " + response.report.foods[0].name);
            var productCount = carbs / response.report.foods[0].nutrients[0].value;
            productCount = Math.round(productCount);
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            console.log ("Measure " + response.report.foods[0].measure + " Quanity " + productCount);
            console.log("so you get from this product " + productCount * response.report.foods[0].nutrients[0].value);
            console.log (totalCalsBreakfast);
        }
        else if (nutrition === "fat") {
            var fat = dailyCalsIntake * 0.25;
            console.log("you need to get " + fat + " calories from " + nutrition);
            console.log("Selected product: " + response.report.foods[0].name);
            var productCount = fat / response.report.foods[0].nutrients[0].value;
            productCount = Math.round(productCount);
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            console.log ("Measure " + response.report.foods[0].measure + "  Quanity " + productCount);
            console.log("so you get from this product " + productCount * response.report.foods[0].nutrients[0].value);
            console.log (totalCalsBreakfast);
        }
        else {
            var protein = dailyCalsIntake * 0.15;
            console.log("you need to get " + protein + " calories from " + nutrition);
            console.log("Selected product: " + response.report.foods[0].name);
            var productCount = protein / response.report.foods[0].nutrients[0].value;
            productCount = Math.round(productCount);
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            console.log ("Measure " + response.report.foods[0].measure + " Quanity " + productCount);
            console.log("so you get from this product " + productCount * response.report.foods[0].nutrients[0].value);
            console.log (totalCalsBreakfast);
        }
    });
}

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
                console.log(prodChoices.length)
                break;
            }
        }
        if (totalProducts > totalCounted) {
            queryURL = "https://api.nal.usda.gov/ndb/search/?" + "&offset=" + totalCounted + "&q=" + productName + "&api_key=" + foodApiKey + "&ds=" + dataSource;
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


//onclick function





