
//onclick function
$("#calculate").click(function(){
    //Testing to see if event listener is working
    console.log("This button was clicked.");


    //weight
    //grabbing weight input from form
    var weight=parseFloat($("#weight").val().trim());
    //multiplying weight x 10
    var weightBmr=(weight * 10);
    

    //age
    //grabbing age input from form
    var age=parseFloat($("#age").val().trim());
    //multiplying age x 5
    var ageBmr=(age * 5);
    //testing output of math
    console.log("Age Bmr: " + ageBmr);

    //gender
    //BROKEN
   var male = $("#gender").prop("checked", true);
   var female = $("#gender").prop("checked", false);
   if(male === true){
    console.log ("Male");
    }  
    else if(female === false){
        console.log("Female");
    }

    //from old code
  //var gender=document.getElementById("gender").value;
    //if (gender === male){
      //  var calculatedBmr = weightBmr + heightBmr + ageBmr + male;
    //}
    //else if(gender === female){
        //var calculatedBmr = weightBmr + heightBmr + ageBmr - female;
    //};
    

    $("#feet").val(function(convert){
        var feet=parseFloat($("#feet").val().trim());
        console.log("Feet: " + feet);
        var inchesInFoot=12;
        var convertedFeet= feet * inchesInFoot;
        console.log("Converted Feet: " + convertedFeet);
        var inches=parseFloat($("#inches").val().trim());
        console.log("Inches: " + inches);
        var height = convertedFeet + inches;
        var heightBmr=(height * 6.25);
        console.log("Height Bmr: " +heightBmr);
        console.log("Height: " + height);
        
    });
    

    
    console.log("Age: " + age);
    console.log("Weight: " + weight);
    console.log("Weight Bmr: " +weightBmr);
    
    
   // console.log(calculatedBmr);
});
