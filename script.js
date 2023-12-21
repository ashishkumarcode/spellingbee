// a variable to store a random word
var word;

// a variable to store the scores
var correctWordCount = 0,
  incorrectWordCount = 0,
  incorrectWords = [],
  usedWords = [];

var parentModeOn = false;
var words = pageWords[0].concat(
  pageWords[1],
  pageWords[2],
  pageWords[3],
  pageWords[4],
  pageWords[5],
  pageWords[6],
  pageWords[7],
  pageWords[8],
  pageWords[9],
  pageWords[10],
  pageWords[11],
  pageWords[12],
  pageWords[13],
  pageWords[14],
  pageWords[15]
);

function parentModeChanged(e) {
  parentModeOn = !!e.srcElement.checked;
  if (parentModeOn) {
    document.getElementById("guess-section").style.display = "none";
    document.getElementById("page-section").style.display = "flex";
    pageChosen(1);
  } else {
    document.getElementById("guess-section").style.display = "flex";
    document.getElementById("page-section").style.display = "none";
    words = rootWords;
  }
}

function pageChosen(page) {
  words = pageWords[page - 1];
  usedWords = [];
}

// function pronounceWord to re-assign the word variable and pronounce it
function pronounceWord() {
  word = "";
  document.getElementById("result").innerHTML = word;
  document.getElementById("guess").value = word;
  if ([...new Set(words)].length == usedWords.length) {
    pronounce("All Done!");
  }
  while (true) {
    // get a random word from the array
    word = words[Math.floor(Math.random() * words.length)];
    if (!usedWords.includes(word)) {
      usedWords.push(word);
      // pronounce the word
      pronounce(word);
      if (parentModeOn) document.getElementById("result").innerHTML = word;
      break;
    }
  }
}

function pronounce(phrase) {
  // pronounce the word
  var utterance = new SpeechSynthesisUtterance(phrase);
  window.speechSynthesis.speak(utterance);
}

function repeat() {
  pronounce(word);
}

// function to check if the user's guess is correct
function checkGuess() {
  // get the user's guess
  var guess = document.getElementById("guess").value;

  if (guess.trim() === "" || word === "") {
    return;
  }
  // check if the guess is correct
  if (guess.trim().toLowerCase() === word.toLowerCase()) {
    // if the guess is correct, display the word and read a message
    document.getElementById("result").innerHTML = word;
    pronounce("Correct!");
    word = "";
    correctWordCount++;
  } else {
    // if the guess is incorrect, display the correct word and read a message
    document.getElementById("result").innerHTML = word;
    pronounce("Incorrect. The word was " + word + ".");
    incorrectWordCount++;
    incorrectWords.push(word);
  }
  document.getElementById("guess").value = "";
  document.getElementById("score").innerHTML =
    "Score: " + correctWordCount + "<br>Wrong: " + incorrectWordCount;
}

// function to fetch the meaning of a word
function fetchMeaning() {
  // fetch the meaning of the word
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then((response) => response.json())
    .then((data) => {
      // check if the word exists in the dictionary
      if (data[0].meanings.length > 0) {
        // display the meaning of the word
        pronounce(data[0].meanings[0].definitions[0].definition);
      } else {
        // read an error message if the word does not exist in the dictionary
        pronounce("Sorry, the word does not exist in the dictionary.");
      }
    })
    .catch((error) => {
      // read an error message if there is an error fetching the meaning
      pronounce("Sorry, there was an error fetching the meaning.");
    });
}
