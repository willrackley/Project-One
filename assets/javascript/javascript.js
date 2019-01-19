/*
Developers: Natosha, Will Rackley, Justas Lauzinskas
Title: Complete Welness Coach
Descreption: Georgia Tech Bootcamp: Project 1
Date: 2019-01-10
*/

$(document).ready(function() {
	$("#moreInfoFormContainer").hide();
	$("#nutritionFactsContainer").hide();
	$("#recipeContainer").hide();

	// Event listener after goal is selected and GO clicked
	$("#goalsGoButton").on("click", function() {
		event.preventDefault();
		//if user chooses get healthier or get active then they are redirected to nutrition page or fitness page 
		if ($("#goalsDropDown option:selected").text() === "Eat Healthier") {
			window.location.replace("nutrition.html");
		} else if ($("#goalsDropDown option:selected").text() === "Get Active") {
			window.location.replace("fitness.html");
		}
		$("#moreInfoFormContainer").fadeIn(2000);
	});

	// Input Autocomplete by product name (new technology)
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

	// Event Listener when SEARCH is Clicked (product search)
	$("#submit-product").on("click", function() {
		var usersProduct = $("#enter-product").val().trim();
		var queryURL = "https://api.nal.usda.gov/ndb/search/?max=1&q=" + usersProduct + "&api_key=" + foodApiKey + "&ds=" + dataSource;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			getNutrition(response.list.item[0].ndbno);
		});
		
		// Offer user some healthy recepies by users typed value
		$.ajax({
			url: "https://api.edamam.com/search?q=" + userInput + "&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3",
			method: "GET"
		}).then(function(recipeResponse) {
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

	// Low Fat Button is clicked display recepies
	$("#lowFatButton").on("click", function() {
		var url = "https://api.edamam.com/search?q=diet=low-fat&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3";
		selectRecepies(url);
	});

	// Low Carb Button is clicked display recepies
	$("#lowCarbButton").on("click", function() {
		var url = "https://api.edamam.com/search?q=diet=low-carb&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3";
		selectRecepies(url);
	});

	// High Fiber Button is clicked display recepies
	$("#highFiberButton").on("click", function() {
		var url = "https://api.edamam.com/search?q=diet=high-fiber&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3";
		selectRecepies(url);
	});

	// High Protein Button is clicked display recepies
	$("#highProteinButton").on("click", function() {
		var url = "https://api.edamam.com/search?q=diet=high-protein&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=3&to=6"
		selectRecepies(url);
	});

	$("#calculate").click(function() {
		// ------------- Get values from users form -------------
		var name = $("#nameInput").val().trim();
		var age = parseFloat($("#age").val().trim());
		var gender = $("input:checked").attr("value");
		var weight = parseFloat($("#weight").val().trim());
		var heightForDatabase = $("#feet").val().trim() + " " + $("#inches").val().trim();
		var activity = $("#activity :selected").attr("value");

		// Calculte Age BMR
		var ageBmr = (age * 5);

		// Calculte Gender BMR
		if (gender === "male") {
			var genderBmr = 5;
		} else { // Female
			var genderBmr = -161;
		}

		// Calculte Weight BMR
		var kilograms = 0.453592;
		var convertWeight = Math.round(weight * kilograms);
		var weightBmr = Math.round(convertWeight * 10);

		// Calculte Heiht BMR
		$("#feet").val(function() {
			var feet = parseFloat($("#feet").val());
			var inchesInFoot = 12;
			var convertedFeet = feet * inchesInFoot;
			var inches = parseFloat($("#inches").val().trim());
			var height = convertedFeet + inches;
			var centimeters = 2.54;
			var trueWeight = (height * centimeters);
			heightBmr = (trueWeight * 6.25);
		});

		// Calculate TOTAL BMR
		var calculatedBmr = ageBmr + genderBmr + weightBmr + heightBmr;

		// Activity levels and values by level
		if (activity === "slim") {
			var activityBmr = 1.2;
		} else if (activity === "mild") {
			var activityBmr = 1.375;
		} else if (activity === "moderate") {
			var activityBmr = 1.55;
		} else if (activity === "heavy") {
			var activityBmr = 1.725;
		} else if (activity === "extreme") {
			var activityBmr = 1.9;
		}
	
		// Calculate calories to lose and gain weight by activity level
		var caloriesToLoseWeight = calculatedBmr * activityBmr - 500; // Lose
		var caloriesToGainWeight = calculatedBmr * activityBmr + 500; // Gain
	
		// Assigning value to user by his selected goal
		var userGoal = $("#goalsDropDown :selected").attr("value");
		var userGoalSelection = $("#goalsDropDown").val();
		if (userGoal === "Lose Fat") {
			var getSkinny = caloriesToLoseWeight;
			achieveGoal = parseInt(getSkinny);
		} else if (userGoal === "Gain Muscle") {
			var getJacked = parseInt(caloriesToGainWeight);
			achieveGoal = getJacked;
		}
		var activityLevel = $("#activity").val();

		// Push calculations and users info to database
		database.ref().push({
			name: name,
			age: age,
			gender: gender,
			weight: weight,
			height: heightForDatabase,
			BMR: calculatedBmr,
			activityLevel: activityLevel,
			userGoal: userGoalSelection,
			calsToAchieve: achieveGoal,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
		window.location.replace("wellnessPlan.html");
	});

	// Get last users info from database
	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
		var name = snapshot.val().name;
		var weight = snapshot.val().weight;
		var height = snapshot.val().height;
		var age = snapshot.val().age;
		var userGoal = snapshot.val().userGoal;
		var calsToAchieve = snapshot.val().calsToAchieve;
		var activityLevel = snapshot.val().activityLevel
		usersGoalConversion(calsToAchieve);
		$("#userInfoTitle").text(name + "'s" + " " + "Body Info");
		$("#userAge").text("Age: " + age);
		$("#userWeight").text("Weight: " + weight + " Lbs");
		$("#userHeight").text("Height: " + height);
		$("#userActivityLevel").text("Current Activity Level: " + activityLevel);
		$("#userGoalCalculations").text("To " + userGoal + " you will need to eat " + calsToAchieve + " calories a day");
	});
	getProducts();
});