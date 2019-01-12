
$("#moreInfoFormContainer").hide();

//this click event is for the 'what is your goals form
$("#goalsGoButton").on("click", function(){
    event.preventDefault();
    $("#moreInfoFormContainer").fadeIn(2000);
});