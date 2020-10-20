var participants = [];

function addParticipant() {
  //get the name that was just entered and add it to participants array
  //do nothing if input field empty, differentiate if duplicate
  var name = document.getElementById("input").value;
  var numNameDupe = numSameName(name);
  participants.push(name);

  if (name == "") {
    document.getElementById("input").focus();
    return;
  } else if (numNameDupe > 0) {
    name = name + "#" + numNameDupe;
  }

  //create the container for each participant (and their recipient) with id=index
  var participantContainer = document.createElement("div");
  participantContainer.classList.add("pContainer");
  var containerID = "cont" + (participants.length - 1);
  participantContainer.id = containerID;

  //create the <p> element for each name to be displayed
  var nameP = document.createElement("p");
  nameP.innerHTML = name;

  //the middle "has" part
  var has = document.createElement("p");
  has.classList.add("whiteTxt");
  has.innerHTML = "has";

  //create the <p> element for each participant's recipient (generated on assign())
  //give each a unique ID so they can be modified later (while handling duplicates)
  var recipient = document.createElement("p");
  recipient.innerHTML = "-";
  var recipID = "recip" + (participants.length - 1);
  recipient.id = recipID;
  recipient.classList.add("recipient");

  //the present image which hides the recipient by covering it (higher z-index)
  var present = document.createElement("img");
  present.classList.add("present");
  present.src = "present.png";
  var presID = "pres" + (participants.length - 1);
  present.id = presID;
  present.opacity = 1;
  present.onclick = function() { togglePresent(presID) };

  //add the elements to page and reset input field
  document.getElementById("result").appendChild(participantContainer);
  document.getElementById(containerID).appendChild(nameP);
  document.getElementById(containerID).appendChild(has);
  document.getElementById(containerID).appendChild(recipient);
  document.getElementById(containerID).appendChild(present);
  document.getElementById("input").value = "";
  document.getElementById("input").focus();

  //check if the added present should be hidden or not
  if (addHidden()) {
    present.style.opacity = 1;
  } else {
    present.style.opacity = 0;
  }

  randomise();
}

function togglePresent(presID) {
  p = document.getElementById(presID);
  
  if (p.style.opacity == 1) {
    p.style.opacity = 0;
  } else {
    p.style.opacity = 1;
  }
}

function numSameName(pName) {
  //helper function that returns number of times this name has already been entered
  var count = 0;

  for (i = 0; i < participants.length; i++) {
    if (participants[i] == pName) {
      count++;
    }
  }
  console.log(count);
  console.log(participants);
  return count;
}

function addHidden() {
  //helper function to determine if a present should be added in the
  //hidden or revealed state (true and false respectively)
  if (participants.length > 1) {
    if (document.getElementById("pres0").style.opacity == 1) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

function randomise() {
  //create a shuffled copy of the participants array using shuffle()
  var participantsShuffled = shuffle(participants);

  for (var i = 0; i < participants.length; i++) {
    document.getElementById("recip" + i).innerHTML = participantsShuffled[i];
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
  //loop through each participant result ID
  if (participants.length > 0) {
    if (document.getElementById("pres0").style.opacity == 0) {
      //the presents are already hidden, show them and switch button text
      for (var i = 0; i < participants.length; i++) {
        document.getElementById("pres" + i).style.opacity = 1;
        document.getElementById("hide").innerHTML = "Reveal All";
      }
    } else {
      //the presents aren't hidden, hide them and switch button text
      for (var i = 0; i < participants.length; i++) {
        document.getElementById("pres" + i).style.opacity = 0;
        document.getElementById("hide").innerHTML = "Hide All";
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
