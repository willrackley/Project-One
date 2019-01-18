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

	var lunchCarbs = ["18036","45001664","45009665","45264241", "45227427"]; 
	var lunchFat = ["45084698", "45050912","01040","01133","45370918"]; 
	var lunchProtein = ["45275418", , "45060396", "45040734", "45338954", "45359340"];

	var dinnerCarbs = ["45067729", "45326025", "45341431", "45344313", "09252"]; 
	var dinnerFat = ["09038", "45358502", "45324548", "45029889", "43261"]; 
	var dinnerProtein = ["45044295", "45203420", "45258463", "45215457", "45257089"];

    var snacks = ["09040", "45324896", "18051", "12061", "45176980", "45005274", "09038", "45259892", "45005274", "45219859"]; 

	// suggested foods START
	
    var usersDailyCalories = calsToAchieve; // we have to take this users value from database
    console.log("counted userrs cals " + usersDailyCalories);
	var carbsIntake = parseInt(usersDailyCalories * 0.60); // 60% of calories carbs
	var fatIntake = parseInt(usersDailyCalories * 0.25); // 25% of calories fat
	var proteinIntake = parseInt(usersDailyCalories * 0.15); // 15% of calories protein
	var dailyMealCal = [];

	// print to console
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
    console.log (dailyMealCal);
	addToTable(breakfastCarbs[1], "Breakfast", dailyMealCal[0], "carbs");
	addToTable(breakfastFat[0], "Breakfast", dailyMealCal[0], "fat");
    addToTable(breakfastProtein[0], "Breakfast", dailyMealCal[0], "protein");

  addToTable(snacks[0], "SnackOne", dailyMealCal[1], "carbs");

   console.log(" =========== for lunch you need " + dailyMealCal[2] + " calories ===========");
    addToTable(lunchCarbs[0], "Lunch", dailyMealCal[2], "carbs");
	addToTable(lunchFat[1], "Lunch", dailyMealCal[2], "fat");
    addToTable(lunchProtein[0], "Lunch", dailyMealCal[2], "protein");

   addToTable(snacks[2], "SnackTwo", dailyMealCal[3], "carbs");
    
  console.log(" =========== for dinner you need " + dailyMealCal[2] + " calories ===========");
    addToTable(dinnerCarbs[0], "Dinner", dailyMealCal[4], "carbs");
	addToTable(dinnerFat[0], "Dinner", dailyMealCal[4], "fat");
	addToTable(dinnerProtein[3], "Dinner", dailyMealCal[4], "protein");
}

// Function to find product nutritions by product ID
function addToTable(productId, mealName, dailyCalsIntake, nutrition) {
    var queryURL = "https://api.nal.usda.gov/ndb/nutrients/?max=1&nutrients=208&nutrients=269&nutrients=204&nutrients=205&nutrients=203&ndbno=" + productId + "&api_key=" + foodApiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var mealCarbsIntake = 0;
        var mealFatIntake = 0;
        var mealProteinIntake = 0;

        if (mealName === "Breakfast") {
            mealCarbsIntake = 0.6;
            mealFatIntake = 0.25;
            mealProteinIntake = 1 - mealCarbsIntake - mealFatIntake;
        }
        else if (mealName === "Lunch") {
            mealCarbsIntake = 0.5;
            mealFatIntake = 0.25;
            mealProteinIntake = 1 - mealCarbsIntake - mealFatIntake;
        }
        else {
            mealCarbsIntake = 0.35;
            mealFatIntake = 0.25;
            mealProteinIntake = 1 - mealCarbsIntake - mealFatIntake;
        }

        if (nutrition === "carbs") {
            var carbs = dailyCalsIntake * mealCarbsIntake;
            var productCount = Math.round((carbs / response.report.foods[0].nutrients[0].value) * 2) / 2;
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            var row = $("<tr>");
            console.log (" total calories during this meal from carbs" + totalCalsBreakfast); // we can append this as total calories of EACH meal
            row.appendTo("#" + mealName);
            $("<td>" + response.report.foods[0].name + "</td>").appendTo(row);
            $("<td>" + response.report.foods[0].measure + "</td>").appendTo(row);
            $("<td>" + productCount + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[0].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[4].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[3].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[2].value + "</td>").appendTo(row);

        }
        else if (nutrition === "fat") {
            var fat = dailyCalsIntake * mealFatIntake;
            var productCount = Math.round((fat / response.report.foods[0].nutrients[0].value) * 2) / 2;
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            var row = $("<tr>");
            row.appendTo("#" + mealName);
            $("<td>" + response.report.foods[0].name + "</td>").appendTo(row);
            $("<td>" + response.report.foods[0].measure + "</td>").appendTo(row);
            $("<td>" + productCount + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[0].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[4].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[3].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[2].value + "</td>").appendTo(row);
            console.log (" total calories during this meal from fat " + totalCalsBreakfast); // we can append this as total calories of EACH meal
            
        }
        else {
            console.log(mealProteinIntake);
            var protein = dailyCalsIntake * mealProteinIntake;
            console.log("daily" + dailyCalsIntake);
            var productCount = Math.round((protein / response.report.foods[0].nutrients[0].value) * 2) / 2;
            console.log(productCount);
            var row = $("<tr>");
            row.appendTo("#" + mealName);
            totalCalsBreakfast = totalCalsBreakfast + productCount * response.report.foods[0].nutrients[0].value;
            $("<td>" + response.report.foods[0].name + "</td>").appendTo(row);
            $("<td>" + response.report.foods[0].measure + "</td>").appendTo(row);
            $("<td>" + productCount + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[0].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[4].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[3].value + "</td>").appendTo(row);
            $("<td>" + productCount * response.report.foods[0].nutrients[2].value + "</td>").appendTo(row);
            console.log (" total calories during this meal from protein " + totalCalsBreakfast); // we can append this as total calories of EACH meal
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





