// an array to store words
var words = ["javascript", "programming", "computer", "science", "coding", "algorithm", "debugging", "networking", "database", "web", "development", "coding", "programming", "computer", "science", "coding", "algorithm", "debugging", "networking", "database", "web", "development"];

// a variable to store a random word
var word;

// function pronounceWord to re-assign the word variable and pronounce it
function pronounceWord() {
  // get a random word from the array
  word = words[Math.floor(Math.random() * words.length)];
  // pronounce the word
  pronounce(word);
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
  if (guess === word) {
    // if the guess is correct, display a message
    document.getElementById("result").innerHTML = "Correct! The word was " + word + ".";
    pronounce("Correct!");
  } else {
    // if the guess is incorrect, display a message
    document.getElementById("result").innerHTML = "Incorrect. The word was " + word + ".";
    pronounce("Incorrect!");
  }
}

// function to fetch the meaning of a word
function fetchMeaning() {

  // fetch the meaning of the word
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(response => response.json())
    .then(data => {
      // check if the word exists in the dictionary
      if (data[0].meanings.length > 0) {
        // display the meaning of the word
        document.getElementById("result").innerHTML = data[0].meanings[0].definitions[0].definition;
        pronounce(data[0].meanings[0].definitions[0].definition);
      } else {
        // display an error message if the word does not exist in the dictionary
        document.getElementById("result").innerHTML = "Sorry, the word does not exist in the dictionary.";
      }
    })
    .catch(error => {
      // display an error message if there is an error fetching the meaning
      document.getElementById("result").innerHTML = "Sorry, there was an error fetching the meaning.";
    });
}
