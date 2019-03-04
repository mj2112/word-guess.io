//array of bone anatomy words to randomly pick from

var words = ["scapula", "clavicle", "humerus", "radius", "ulna", "scaphoid", "lunate", "triquetrum", "pisiform", "hamate", "capitate", "trapezoid",
    "trapezium", "maxiallary", "zygomatic", "temporal", "palatine", "parietal", "malleus", "incus", "stapes", "hyoid", "sternum", "sacrum", "coccyx",
    "ilium", "ischium", "pubis", "femur", "patella", "tibia", "fibula", "talus", "calcaneus", "navicular", "cuneiform", "metatarsal", "metacarpal",
    "phalanges", "vertebrae", "cervical", "thoracic", "lumbar", "rib", "atlas", "axis", "frontal", "ethmoid", "vomer", "sphenoid", "mandible", "occipital", "sesamoid"
];

//global variables
var guessesLeft; // number of guesses player has
const guessesAllowed = 8; //Max number of guesses
var guessesSoFar = []; // array for storing incorrect player guesses
var currentWordIndex; // Index of the randomly [icked current word from the words array
var answerArray; // array of progress in guessing word
var gameStarted = false; // to determine if game has started 
var gameOver = true; //  to determine if game is over. Set to true to initialize game with first keypress
var wins = 0; // number of correct word guesses
var losses = 0; // number of times player did not guess word within number of guesses

// get page elements to update and asign variables
var instructionText = document.getElementById("text-instructions"); //diplay instructions, You win, game over
var wordBeingGuessed = document.getElementById("text-word"); //diplay player progress in guessing word
var guessedLetters = document.getElementById("guesses-so-far"); //diplay incorect letter guesses
var numGuessesLeft = document.getElementById("guesses-left"); //display number of guesses player has remaining
var numWins = document.getElementById("text-wins"); //display number of player wins
var numLosses = document.getElementById("text-losses"); // display number of player losses


//function takes in any key press to start game and then letter gueses once game started
//passes key input event into playerGuess function
document.onkeydown = function(event) {
    // If first game or game over, press any key and then start game
    if (gameOver) {
        initializeGame();
        gameOver = false;
        console.log(gameOver);
    } else {
        //keyboard input from player - convert to lower case to match array words
        playerGuess(event.key.toLowerCase());
        //console.log(event.key.toLowerCase());
    }
};


// will initialize game state at start(gameOver = true at start) as above and for each new game
function initializeGame() {
    guessesLeft = guessesAllowed; //set maximum number of incorrect guesses
    gameStarted = false; // set to false initially so first keypress starts a game instead of being a guess
    //console.log("Guesses left " + guessesLeft);
    //console.log("game started " + gameStarted);

    // pick random word index from words arrray
    currentWordIndex = Math.floor(Math.random() * (words.length));
    //console.log("current word index " + currentWordIndex);
    // Clear out arrays to fill each game
    guessesSoFar = [];
    answerArray = [];

    // make an array of dashes equal in length to word that will be replaced with correct guesses
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        answerArray.push("_");
        //console.log(answerArray);
    }
    // call function to show display in document elements
    updateDisplay();
};
// after game started, takes in next letter guess
function playerGuess(letter) {
    //see if player has remaining guesses
    //console.log(letter);
    if (guessesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true; // changes game state to show game is in progress after keypress to start game

        }

        // Make sure the players guesses aren't already in guessesSoFar array (-1)
        // If not, pass the letter guess into checkGuess
        if (guessesSoFar.indexOf(letter) === -1) {
            guessesSoFar.push(letter);
            checkGuess(letter);

            //console.log(guessesSoFar);
            //console.log(checkGuess(letter));
        }
    }

    updateDisplay(); //update results in display with player guess
    checkForWin(); // check to see with each letter guess if the player has won
};
// function to check if letter in word being guessed
function checkGuess(letter) {
    // Array to store positions (index) of correct letter guesses
    var positions = [];

    // Loop through word finding any instances of guessed letter, store the index in positions array
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        if (words[currentWordIndex][i] === letter) {
            positions.push(i);

        }
    }
    //console.log(positions);
    // if there are no indicies of the letter in word being guuessed (<= 0)
    // remove a guess and update the 
    if (positions.length <= 0) {
        // decrement remaining guesses 
        guessesLeft = guessesLeft - 1;

    } else { //letter is in the word being guessed
        // Loop through answerArray indicies and replace the '_' with the correct letter
        for (var i = 0; i < positions.length; i++) {
            answerArray[positions[i]] = letter;
            answerArrayDisplay = answerArray.join(" ");
            //console.log(answerArrayDisplay);
        }
    }
};

//  Updates what the html elements display 
function updateDisplay() {
    instructionText.textContent = ""; //when round started, removes instructions
    answerArrayDisplay = answerArray.join(" "); //convert answerArray so it can be displayed
    //console.log(answerArrayDisplay);
    wordBeingGuessed.textContent = answerArrayDisplay; //shows player progress in guessing word
    // display incorrect guesses to player
    guessedLetters.textContent = "Letters already guessed:  " + guessesSoFar;
    // display reamining guesses to player
    numGuessesLeft.textContent = "Remaining guesses: " + guessesLeft;
    // display total wins and losses to player
    numWins.textContent = "Wins: " + wins;
    numLosses.textContent = "Losses: " + losses;

    // if player runs out of guesses before checkForWin() shows win, 
    // display what the answer was and instructions to start a new game
    if (guessesLeft <= 0) {
        instructionText.textContent = "Sorry, the word was: " + words[currentWordIndex] + ". " + "Press any key to play again!";
        losses++; //update numLosses
        gameOver = true; //reset game state for press any key for new game
    }

};

// evaluates if player answerArray is filled up (has guessed all letters correctly) and 
//displays win and resets game state for 'press any key'
function checkForWin() {
    // if no '_' left in answer Array after a letter guessed
    if (answerArray.indexOf("_") === -1) {
        // display win
        instructionText.textContent = "You Win! Press any key to play new game!";
        wins++; //update numWins
        gameOver = true; //reset game state for press any key to play new game
    }
};