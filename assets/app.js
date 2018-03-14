// Logic for trains and the times
//Firebase is in html

var config = {
    apiKey: "AIzaSyDEMSz_PNET5-13HKDZt_eMquUfxa0Li0c",
    authDomain: "trainstation-6d9ce.firebaseapp.com",
    databaseURL: "https://trainstation-6d9ce.firebaseio.com",
    projectId: "trainstation-6d9ce",
    storageBucket: "",
    messagingSenderId: "238799817150"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button to add trains to the database
$("#add-train").on("click", function(event) {
    event.preventDefault();

    // var day = moment.unix(1318781876);
    // var now = moment();

    //Grabs user input from the form on the page
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#time").val().trim(), "hh:mm").format("X");
    console.log(firstTrain);
    var frequency = $("#frequency").val().trim();



    //Create local "temporary" object for train data
    var newTrain = {
        name: trainName,
        where: destination,
        start: firstTrain,
        regularity: frequency
    };

    //Uploads train data to the data base
    database.ref().push(newTrain);

    //Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.where);
    console.log(newTrain.start);
    console.log(newTrain.regularity);

    //Clears the text boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
});

//Create an event in database when train is added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val());


// $("#train-schedule").empty();


    //Store this data into a variable to re-use
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().where;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().regularity;

//Need lots of Math and more variables here to get the correct times
var nextArrival = moment().diff(moment.unix(firstTrain), "minutes");
console.log(nextArrival);
var nextArrival2 = moment(firstTrain).add(moment(frequency, "minutes"));
console.log(nextArrival2);
var freqRemainder = nextArrival % frequency;
console.log(freqRemainder);
var finalMinutes = frequency - freqRemainder;
console.log(finalMinutes);
var nextArrival3 = moment().add(finalMinutes, "m").format("hh:mm a");
console.log(nextArrival3);
var minAway;

//Add each train's data into the table
$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival3 + "</td><td>" + finalMinutes + "</td></tr>");
});