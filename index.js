var participants = [];

function addParticipant() {
    //get the name that was just entered and add it to participants array
    var name = document.getElementById("input").value;
    participants.push(name);

    //create the <p> element for each name to be displayed
    var nameP = document.createElement("p");
    nameP.innerHTML = name;

    //create the <p> element for each participant's recipient (generated on assign())
    //give each a unique ID so they can be modified later
    var recipient = document.createElement("p");
    recipient.innerHTML = "/"
    recipient.id = name; //TODO make the IDs unique

    //add the elements to page and reset input field
    document.body.appendChild(nameP);
    document.body.appendChild(recipient);
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
}

function randomise() {
    //create a shuffled copy of the participants array using shuffle()
    var participantsShuffled = shuffle(participants);

    for (var i = 0; i < participants.length; i++) {
        document.getElementById(participants[i]).innerHTML = participantsShuffled[i];
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
    for (var i = 0; i < participants.length; i++) {
        if (document.getElementById(participants[i]).style.display == "none") {
            //the results are already hidden, reveal them and switch button text
            document.getElementById(participants[i]).style.display = "block";
            document.getElementById("hide").innerHTML = "Hide";
        } else {
            //the results aren't hidden, hide them and switch button text
            document.getElementById(participants[i]).style.display = "none";
            document.getElementById("hide").innerHTML = "Reveal";
        }
    }
}

//add an event listener (for the enter key) when input is focused
document.getElementById("input").addEventListener("keyup", function(e) {
    //enter has a keycode of 13
    if (e.keyCode == 13) {
        //call the same function that clicking add calls
        addParticipant();
    }
});