var firebaseConfig = {
  apiKey: "AIzaSyCroC6RTA2F-mFQp8Mkt2jE3AHq-11i3fQ",
  authDomain: "test-7fdba.firebaseapp.com",
  databaseURL: "https://test-7fdba.firebaseio.com",
  projectId: "test-7fdba",
  storageBucket: "test-7fdba.appspot.com",
  messagingSenderId: "36874739975",
  appId: "1:36874739975:web:772dc90160f91a54e7a5a2",
  measurementId: "G-SHZG6VZFCS"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#new-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrnTime = $("#first-train-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
 
  if (trainName != "" && 
    trainDest != "" &&
    firstTrnTime != "" &&
		trainFreq != "") {

    database.ref().push ({
      name: trainName,
      destination: trainDest,
      firstTime: firstTrnTime,
      frequency: trainFreq,
  });

} else {
  alert("Train data is invalid, please verify your information");
  $("input").val("");
  return false;
}

$("input").val("");
 
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

 
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrnTime = childSnapshot.val().firstTime;
  var trainFreq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrnTime);
  console.log(trainFreq);

  var firstTrainTimeConv = moment(firstTrnTime, "hh:mm a").subtract(1, "years");

  var currentTime = moment().format("HH:mm a");
  console.log("Current Time:" + currentTime);
  
  var trnTimeCurrTimeDiff = moment().diff(moment(firstTrainTimeConv), "minutes");

  var timeLeft = trnTimeCurrTimeDiff % trainFreq;

  var minAway = trainFreq - timeLeft;

  var nextArrival = moment().add(minAway, "minutes").format("hh:mm a");

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
});