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
	
	//this click event is for the 'what is your goals form
	$("#goalsGoButton").on("click", function() {
		event.preventDefault();
		
		//if user chooses get healthier or get active then they are redirected to nutrition page or fitness page 
		if ($("#goalsDropDown option:selected").text() === "Eat Healthier") {
			window.location.replace("nutrition.html");
		} else if($("#goalsDropDown option:selected").text() === "Get Active"){

			window.location.replace("fitness.html");
		}

		$("#moreInfoFormContainer").fadeIn(2000);
	});
	
	console.log(queryURL);
	// Function to get all products names localy from API to prepare autocomplete input.
	

	

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
	//low fat badge button click function
	$("#lowFatButton").on("click", function() {
		$.ajax({
			url: "https://api.edamam.com/search?q=diet=low-fat&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3",
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
	});
	$("#lowCarbButton").on("click", function() {
		$.ajax({
			url: "https://api.edamam.com/search?q=diet=low-carb&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3",
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
	});
	$("#highFiberButton").on("click", function() {
		$.ajax({
			url: "https://api.edamam.com/search?q=diet=high-fiber&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=0&to=3",
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
	});
	

$("#highProteinButton").on("click", function(){

	$.ajax({
		url: "https://api.edamam.com/search?q=diet=high-protein&app_id=9da3c30b&app_key=19ccaeb71fe4478bcccf7eeed1597c0e&from=3&to=6",
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
});

$("#calculate").click(function(){
    //Testing to see if event listener is working
    console.log("This button was clicked.");

    //name
    //grabbing name input from form
    var name = $("#nameInput").val().trim();

    //age
    //grabbing age input from form
    var age=parseFloat($("#age").val().trim());
    //multiplying age x 5
    var ageBmr=(age * 5);
    //testing output of math
    console.log("Age Bmr: " + ageBmr);
    console.log("Age: " + age);

    //gender
    var gender = $("input:checked").attr("value");
 
    if(gender === "male"){
        var genderBmr = 5;
     console.log ("Age Bmr: " + genderBmr);
     }  
     else {
        var genderBmr = -161;
     console.log("Age Bmr: " + genderBmr);
     }

     //weight
    //grabbing weight input from form
    var weight=parseFloat($("#weight").val().trim());
     var kilograms=0.453592;
     var convertWeight=Math.round( weight * kilograms );
     console.log("Converted weight: " + convertWeight);
    //multiplying weight x 10
    var weightBmr=Math.round(convertWeight * 10);
    console.log("Weight: " + weight);
    console.log("Weight Bmr: " + weightBmr);


    //height

    var heightForDatabase = $("#feet").val().trim() + " " + $("#inches").val().trim();

    $("#feet").val(function(){
        var feet=parseFloat($("#feet").val());
        console.log("Feet: " + feet);
        var inchesInFoot=12;
        var convertedFeet= feet * inchesInFoot;
        console.log("Converted Feet: " + convertedFeet);
        var inches=parseFloat($("#inches").val().trim());
        console.log("Inches: " + inches);
        var height = convertedFeet + inches;
        var centimeters = 2.54;
        var trueWeight=(height * centimeters);
        console.log("Cen: " + trueWeight);
        heightBmr=(trueWeight * 6.25);
        console.log("Height Bmr: " +heightBmr);
        console.log("Height: " + height);
        
        
    });

   var calculatedBmr= ageBmr +  genderBmr + weightBmr + heightBmr;
   //convertedFeet + inches * 6.45 is heightBmr
   console.log("BMR: " + calculatedBmr);
  

    //from old code
  //var gender=document.getElementById("gender").value;
    //if (gender === male){
      //  var calculatedBmr = weightBmr + heightBmr + ageBmr + male;
    //}
    //else if(gender === female){
        //var calculatedBmr = weightBmr + heightBmr + ageBmr - female;
    //};
    
    
    //activity
    //reading activity
    //var options = $("#activity option");
    var activity = $("#activity :selected").attr("value");
    console.log(activity);
    if(activity === "slim"){
        var activityBmr = 1.2;
        console.log(activityBmr);
     }
     else if(activity === "mild"){
        var activityBmr = 1.375 ;
     }  
     else if(activity === "moderate"){
        var activityBmr = 1.55;
     }  
     else if(activity === "heavy"){
        var activityBmr = 1.725 ;
     
     }  
     else if(activity === "extreme"){
        var activityBmr = 1.9;
     
     }   
     console.log("Activity BMR: " + activityBmr);


     //losing weight calculation
     var caloriesToLoseWeight = calculatedBmr * activityBmr - 500;
     //testing
     console.log(caloriesToLoseWeight);


     //gainingweight calculation
     var caloriesToGainWeight =
     calculatedBmr * activityBmr + 500;
     //testing
     console.log(caloriesToGainWeight);


    var userGoal = $("#goalsDropDown :selected").attr("value");
    var userGoalSelection = $("#goalsDropDown").val();
    if(userGoal === "Lose Fat"){
        var getSkinny = caloriesToLoseWeight;
        achieveGoal = parseInt(getSkinny);
    } else if(userGoal === "Gain Muscle"){
        var getJacked = parseInt(caloriesToGainWeight);
        achieveGoal = getJacked;
    }

    database.ref().push({
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        height: heightForDatabase,
        BMR: calculatedBmr,
        userGoal: userGoalSelection,
        calsToAchieve: achieveGoal,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      
});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

    var name = snapshot.val().name;
    var weight = snapshot.val().weight;
    var height = snapshot.val().height;
    var age = snapshot.val().age;
    var userGoal = snapshot.val().userGoal;
    calsToAchieve = snapshot.val().calsToAchieve;
    usersGoalConversion();


    $("#userInfoTitle").text(name+ "'s" + " " + "Body Info");
    $("#userWeight").text("Weight: " + weight + "Lbs");
    $("#userHeight").text("Height: " + height);
    $("#userAge").text("Age: " + age);
    $("#userGoalCalculations").text("To " + userGoal + " you will need to eat " + calsToAchieve + " calories a day");
    
  });

	
	// Going to store healthy products IDs from USDA for each meal

getProducts();
  

});    
