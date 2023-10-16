var participantsArr = [];

function addParticipant() {
  //get the name that was just entered and add it to participants array
  //do nothing if input field empty, differentiate if duplicate
  var name = document.getElementById("input").value;
  var numNameDupe = numSameName(name, participantsArr);
  participantsArr.push(name);

  if (name == "") {
    document.getElementById("input").focus();
    return;
  } else if (numNameDupe > 0) {
    name = name + "#" + numNameDupe;
  }

  //create the container for each participant (and their recipient) with id=index
  var participantContainer = document.createElement("div");
  participantContainer.classList.add("pContainer");
  var containerID = "cont" + (participantsArr.length - 1);
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
  var recipID = "recip" + (participantsArr.length - 1);
  recipient.id = recipID;
  recipient.classList.add("recipient");

  //the present image which hides the recipient by covering it (higher z-index)
  var present = document.createElement("img");
  present.classList.add("present");
  present.src = "present.png";
  var presID = participantsArr.length - 1;
  present.id = "pres" + presID;
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
    recipient.style.opacity = 0;
  } else {
    present.style.opacity = 0;
    recipient.style.opacity = 1;
  }
  randomise(participantsArr);
}

function togglePresent(presID) {
  console.log(presID);
  var p = document.getElementById("pres" + presID);
  var r = document.getElementById("recip" + presID);
  
  if (p.style.opacity == 1) {
    p.style.opacity = 0;
    r.style.opacity = 1;
  } else {
    p.style.opacity = 1;
    r.style.opacity = 0;
  }

  if (allNamesRevealed()) {
    document.getElementById("hide").innerHTML = "Hide All";
  } else {
    document.getElementById("hide").innerHTML = "Reveal All";
  }
}

function numSameName(participantName, participantsArray) {
  //helper function that returns number of times this name has already been entered
  var count = 0;

  for (i = 0; i < participantsArray.length; i++) {
    if (participantsArray[i] == participantName) {
      count++;
    }
  }
  return count;
}

function addHidden() {
  //helper function to determine if a present should be added in the
  //hidden or revealed state (true and false respectively)
  if (participantsArr.length > 1) {
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
  var participantsShuffled = shuffle(participantsArr);
  var encrypted = document.getElementById("encryptMode").checked;

  for (var i = 0; i < participantsArr.length; i++) {
    if (encrypted) {
        document.getElementById("recip" + i).innerHTML = encrypt(participantsShuffled[i]);
    } else {
        document.getElementById("recip" + i).innerHTML = participantsShuffled[i];
    }
  }
  return participantsShuffled;
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

function encrypt(participant) {
  var encryptedParticipant = "";
  var cipherKey = 13;

  for (var i = 0; i < participant.length; i++) {
    var charCode = participant.charAt(i).charCodeAt();
    //console.log("Initial char code is: " + charCode);

    //lower case ASCII alphabet is 97(a) to 122(z)
    //TODO: make this work for upper case alphabet too
    if (charCode + cipherKey > 122) { //start at beginning of alphabet
      charCode += cipherKey - 26;
    } else {
      charCode += cipherKey;
    }
    //console.log("Encrypted char code is: " + charCode);

    var char = String.fromCharCode(charCode);
    encryptedParticipant += char;
  }
  
  return encryptedParticipant;
}

function toggleResults() {
  //loop through each participant result ID
  if (participantsArr.length > 0) {
    if (allNamesRevealed()) {
      //the presents are all hidden, show them and switch button text
      for (var i = 0; i < participantsArr.length; i++) {
        document.getElementById("pres" + i).style.opacity = 1;
        document.getElementById("recip" + i).style.opacity = 0;
        document.getElementById("hide").innerHTML = "Reveal All";
      }
    } else {
      //the presents aren't all hidden, hide them and switch button text
      for (var i = 0; i < participantsArr.length; i++) {
        document.getElementById("pres" + i).style.opacity = 0;
        document.getElementById("recip" + i).style.opacity = 1;
        document.getElementById("hide").innerHTML = "Hide All";
      }
    }
  }
}

function allNamesRevealed() {
  for (var i = 0; i < participantsArr.length; i++) {
    var pID = "pres" + i;
    if (document.getElementById(pID).style.opacity == 1) {
      return false;
    }
  }
  return true;
}

//add an event listener (for the enter key) when input is focused
document.getElementById("input").addEventListener("keyup", function (e) {
  //enter has a keycode of 13
  if (e.keyCode == 13) {
    //call the same function that clicking add calls
    addParticipant();
  }
});


// // TODO:
// // This is the format of an array of objects that would enable a Secret Santa shuffle
// // that has a "no partner match-up" rule (e.g. in a family, a mum and dad would not be assigned each other)
// const hardCodedParticipants = [
//     { name: "name", partnerGroup: 0, recipient: ""},
//     { name: "mum", partnerGroup: 1, recipient: ""},
//     { name: "dad", partnerGroup: 1, recipient: ""},
// ];

// function staticShuffle(array) {
//     //use slice() so it is a clone rather than simply referencing old array
//     const shuffled = array.slice();

//     for (let i = shuffled.length - 1; i > 0; i--) {
//         //loop backwards through array, random number between 0 and i (but not including i)
//         //for the new array element's index so it is always a different element
//         // const j = Math.floor(Math.random() * i);
//         // const temp = shuffled[i];
//         // shuffled[i] = shuffled[j];
//         // shuffled[j] = temp;

//         let j = Math.floor(Math.random() * i);
//         if (shuffled[i].partnerGroup === shuffled[j].partnerGroup) {
//             return 1;
//         }
//         const temp = shuffled[i];
//         shuffled[i] = shuffled[j];
//         shuffled[j] = temp;
//     }
//     return shuffled;
// }

// function staticRandomise(participants, encrypted) {
//     //create a shuffled copy of the participants array using shuffle()
//     // const participantsShuffled = staticShuffle(participants);

//     let participantsShuffled = staticShuffle(participants);
//     while (participantsShuffled === 1) {
//         console.debug('generating again');
//         participantsShuffled = staticShuffle(participants);
//     }

//     for (let i = 0; i < participants.length; i++) {
//         participants[i].recipient = encrypted 
//                 ? encrypt(participantsShuffled[i].name)
//                 : participantsShuffled[i].name;
//     }

//     return participants;
// }

// // console.log(staticRandomise(hardCodedParticipants, true));
