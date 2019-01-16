$("#age").val();
console.log("#age");


//onclick function
$("#calculate").click(function(){
    console.log("This button was clicked.");
    var age=parseFloat($("#age").val().trim());
    console.log(age);

});