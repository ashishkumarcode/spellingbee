// an array to store words
var words = ["javascript", "programming", "computer", "science", "coding", "algorithm", "debugging", "networking", "database", "web", "development", "coding", "programming", "computer", "science", "coding", "algorithm", "debugging", "networking", "database", "web", "development"];

// a variable to store a random word
var word;

// function pronounceWord to re-assign the word variable and pronounce it
function pronounceWord() {
  // get a random word from the array
  word = words[Math.floor(Math.random() * words.length)];
  // pronounce the word
  var utterance = new SpeechSynthesisUtterance(word);
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
  } else {
    // if the guess is incorrect, display a message
    document.getElementById("result").innerHTML = "Incorrect. The word was " + word + ".";
  }
}
