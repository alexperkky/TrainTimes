// alert("test");
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTGJXOXPVaFIF86z6pepNDWx9N9Sk3ZD0",
    authDomain: "train-times-6b1c9.firebaseapp.com",
    databaseURL: "https://train-times-6b1c9.firebaseio.com",
    projectId: "train-times-6b1c9",
    storageBucket: "train-times-6b1c9.appspot.com",
    messagingSenderId: "1035312387718"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on('click', function() {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();

    console.log(firstTrain);
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+ "</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})