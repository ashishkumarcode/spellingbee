// a variable to store a random word
var word;

// a variable to store the scores
var correctWordCount = 0,
  incorrectWordCount = 0,
  incorrectWords = [],
  usedWords = [];

// function pronounceWord to re-assign the word variable and pronounce it
function pronounceWord() {
  word = "";
  document.getElementById("result").innerHTML = word;
  while (true) {
    // get a random word from the array
    word = words[Math.floor(Math.random() * words.length)];
    if (!usedWords.includes(word)) {
      usedWords.push(word);
      // pronounce the word
      pronounce(word);
      break;
    }
  }
}

function pronounce(phrase) {
  // pronounce the word
  var utterance = new SpeechSynthesisUtterance(phrase);
  window.speechSynthesis.speak(utterance);
}

// function to check if the user's guess is correct
function checkGuess() {
  // get the user's guess
  var guess = document.getElementById("guess").value;
  // check if the guess is correct
  if (guess.toLowerCase() === word.toLowerCase()) {
    // if the guess is correct, read a message
    pronounce("Correct!");
    correctWordCount++;
  } else {
    // if the guess is incorrect, display the correct word and read a message
    document.getElementById("result").innerHTML = word;
    pronounce("Incorrect. The word was " + word + ".");
    incorrectWordCount++;
    incorrectWords.push(word);
  }
  document.getElementById("score").innerHTML = "Score: " + correctWordCount;
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
