
//onclick function
$("#calculate").click(function(){
    console.log("This button was clicked.");
    var age=parseFloat($("#age").val().trim());
    var weight=parseFloat($("#weight").val().trim());
    console.log(age);
});
