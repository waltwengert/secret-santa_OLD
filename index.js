var participants = [];

function addParticipant() {
  //get the name that was just entered and add it to participants array
  //do nothing if input field empty
  var name = document.getElementById("input").value;
  if (name == "") {
    document.getElementById("input").focus();
    return;
  }
  participants.push(name);

  //create the <p> element for each name to be displayed
  var nameP = document.createElement("p");
  nameP.innerHTML = name;

  //create the <p> element for each participant's recipient (generated on assign())
  //give each a unique ID so they can be modified later
  var recipient = document.createElement("p");
  recipient.innerHTML = "/";
  recipient.id = name; //TODO make IDs unique (in case multiple same names)

  //add the elements to page and reset input field
  document.getElementById("result").appendChild(nameP);
  document.getElementById("result").appendChild(recipient);
  document.getElementById("input").value = "";
  document.getElementById("input").focus();

  //check if the added recipient should be hidden or not
  if (addHidden()) {
    recipient.style.display = "none";
  } else {
    recipient.style.display = "block";
  }
}

function addHidden() {
  //helper function to determine if a recipient should be added in the
  //hidden or revealed state (true and false respectively)
  if (participants.length > 1) {
    if (document.getElementById(participants[0]).style.display == "none") {
      console.log("already hidden");
      return true;
    } else {
      console.log("revealed");
      return false;
    }
  }
  console.log("first");
  return true;
}

function randomise() {
  //create a shuffled copy of the participants array using shuffle()
  var participantsShuffled = shuffle(participants);

  for (var i = 0; i < participants.length; i++) {
    document.getElementById(participants[i]).innerHTML =
      participantsShuffled[i];
  }
}

function shuffle(array) {
  //use slice() so it is a clone rather than simply referencing old array
  var shuffled = array.slice();

  for (var i = shuffled.length - 1; i > 0; i--) {
    //loop backwards through array, random number between 0 and i (but not including i)
    //for the new array element's index so it is always a different element
    var j = Math.floor(Math.random() * i);
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

function toggleResults() {
  //TODO only do anything when at least one participant added
  //loop through each participant result ID
  if (participants.length > 1) {
    if (document.getElementById(participants[0]).style.display == "none") {
      //the results are already hidden, reveal them and switch button text
      for (var i = 0; i < participants.length; i++) {
        document.getElementById(participants[i]).style.display = "block";
        document.getElementById("hide").innerHTML = "Hide";
      }
    } else {
      //the results aren't hidden, hide them and switch button text
      for (var i = 0; i < participants.length; i++) {
        document.getElementById(participants[i]).style.display = "none";
        document.getElementById("hide").innerHTML = "Reveal";
      }
    }
  }
}

//add an event listener (for the enter key) when input is focused
document.getElementById("input").addEventListener("keyup", function (e) {
  //enter has a keycode of 13
  if (e.keyCode == 13) {
    //call the same function that clicking add calls
    addParticipant();
  }
});
