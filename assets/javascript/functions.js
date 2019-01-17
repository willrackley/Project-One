var ageBmr=0;
var genderBmr=0;
var weightBmr=0;
var heightBmr=0;
var activityBmr=0;
//not sure if needed as global variables
var convertedFeet=0;
var inches=0;

var caloriesToLoseWeight=0;
var caloriesToGainWeight=0;



//onclick function
$("#calculate").click(function(){
    //Testing to see if event listener is working
    console.log("This button was clicked.");

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
        var genderBmr = 161;
     console.log("Age Bmr: " + genderBmr);
     }

     //weight
    //grabbing weight input from form
    var weight=parseFloat($("#weight").val().trim());
    //multiplying weight x 10
    var weightBmr=(weight * 10);
    console.log("Weight: " + weight);
    console.log("Weight Bmr: " +weightBmr);


    //height
    $("#feet").val(function(convert){
        var feet=parseFloat($("#feet").val());
        console.log("Feet: " + feet);
        var inchesInFoot=12;
        var convertedFeet= feet * inchesInFoot;
        console.log("Converted Feet: " + convertedFeet);
        var inches=parseFloat($("#inches").val().trim());
        console.log("Inches: " + inches);
        var height = convertedFeet + inches;
        var heightBmr=parseInt(height * 6.25);
        console.log("Height Bmr: " +heightBmr);
        console.log("Height: " + height);
        
        
    });
    
   var calculatedBmr= ageBmr +  genderBmr + weightBmr + (convertedFeet + inches) * 6.25;
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
    var activity = $("#activity :selected").text();
    console.log(activity);
    if(activity === "slim"){
        var activityBmr = 1.2;
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
     var caloriesToLoseWeight = calculatedBmr * activityBmr;
     //testing
     console.log(caloriesToLoseWeight);


     //gainingweight calculation
     var caloriesToGainWeight =
     calculatedBmr * activityBmr + 500;
     //testing
     console.log(caloriesToGainWeight);

     //Display results
    //css/bootstrap is needed here
     $("#display-losingWeightResults").html("To lose weight your recommend daily caliore intake is:  " + caloriesToLoseWeight);
    //css/bootstrap is needed here
    $("#display-gainingWeightResults").html("To gain weight your recommend daily caliore intake is: " + caloriesToGainWeight);
     
     
});





