// intial values
let counter = 15;
let currentQuestion = 0;
let wins = 0;
let losses = 0;
let timer;

const correctImageArray = [
  './assets/gifs/right1.gif',
  './assets/gifs/right2.gif',
  './assets/gifs/right3.gif',
  './assets/gifs/right4.gif',
];

const wrongImageArray = [
  './assets/gifs/wrong1.webp',
  './assets/gifs/wrong1.gif',
  './assets/gifs/wrong2.gif',
  './assets/gifs/wrong3.gif',
  './assets/gifs/wrong4.gif',
  './assets/gifs/wrong5.gif',
]
//  the function that counts down to zero and then calls the timeIsUp() function if no choice is made.
function countdown() {
  counter--;
  $('#time').html(`Timer: ${counter}`);
  if (counter === 0) {
    timeIsUp();
  }
}
// when time is up clear the timer's interval,
// the choice counts as a loss, 
// hides the timer
// calls the lose image
// creates a timer for 3 secs for answer and image
function timeIsUp() {
  clearInterval(timer);
  losses++;
  $('#time').hide()
  loadImage('lose');
  setTimeout(nextQuestion, 3 * 1000);
}

function nextQuestion() {
  // if currentQuestion is equal to the index of last question we are at the end.
  const isQuizOver = currentQuestion === (quizQuestions.length - 1);
  //if the game is over call the function to display the results
  if (isQuizOver) {
    console.log("game over");
    displayResult();
  }
  else {
    currentQuestion++;
    loadQuestion();
  }
}


function loadQuestion() {
  $('#time').show()
  counter = 15;
  timer = setInterval(countdown, 1000)
  const question = quizQuestions[currentQuestion].question;
  const choices = quizQuestions[currentQuestion].choices;
  // $('#game').html('<h4>' + question + '</h4>') es5
  $('#time').html(`Timer: ${counter}`);
  $('#image').html(`<img src=${quizQuestions[currentQuestion].questionImage} class="image">`)
  $('#game').html(`<h4>  ${question}  </h4>
  ${loadChoices(choices)}
  ${loadRemainingQuestions()}
  `)
}

function loadChoices(choices) {
  let result = '';
  for (let i = 0; i < choices.length; i++) {
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;

  }
  return result;
}

// answer choices click handler
$(document).on('click', '.choice', function () {
  clearInterval(timer);
  $('#time').hide()
  const selectedAnswer = $(this).attr('data-answer')
  console.log('clicked', selectedAnswer);
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  //WIN
  if (correctAnswer === selectedAnswer) {
    //score goes up
    wins++;
    loadImage('win');
    setTimeout(nextQuestion, 3 * 1000);
    console.log('you win');

    //LOSE
  } else {
    losses++;
    loadImage('lose');
    setTimeout(nextQuestion, 3 * 1000);
    console.log('you lose');
  }
});

// Displays the results of the quiz. Rounds the answer to no decimal points.
function displayResult() {
  const result = `<div id="result-div">
 <h2>Game over</h2> 
  <p>You got ${(wins / quizQuestions.length * 100).toFixed(0)}% of the questions right</p>
  <p>You got ${wins} /${quizQuestions.length} questions right</p>
  <p>You missed ${losses}/${quizQuestions.length} questions</p>
  <button class="btn btn-primary" id="reset">Reset Game</button>
  `;
  $('#game').html(result);
  console.log(`score : ${wins}, losses: ${losses} out of ${quizQuestions.length} questions `)
}

// Reset button
$(document).on('click', '#reset', function () {
  console.log('reset clicked')
  counter = 15;
  currentQuestion = 0;
  wins = 0;
  losses = 0;
  timer = null;
  loadQuestion();
})
// };

function loadRemainingQuestions() {
  const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
  const totalQuestion = quizQuestions.length;
  return `Remaining Question: ${remainingQuestion}/${totalQuestion}`
}


function loadImage(status) {
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (status === 'win') {
    $('#game').html(`
<p class="load-image">Congratulations, you picked the correct answer!</p>
<img src="${showRandomImage(correctImageArray)}">

<p class="load-image">The correct answer is <strong>${correctAnswer}</strong></p>

`);
    $('#image').html(`<img src=${quizQuestions[currentQuestion].answerImage} class="image">`);

  } else {
    $('#game').html(`
    <p class="load-image"> Nope You picked the wrong answer! </p>
     <img src=${showRandomImage(wrongImageArray)} class="image">
    <p class="load-image">The correct answer is <strong>${correctAnswer}</strong></p>
    `);
    $('#image').html(`<img src=${quizQuestions[currentQuestion].answerImage} class="image">`)
  }
}

// creates a random image index number of which ever image array is passed in.
function showRandomImage(imageArray) {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  const randomImage = imageArray[randomIndex];
  return randomImage;
}

// INITIALIZES the game once button is pressed
$('#start').click(function () {
  $('#start').remove();
  $('#timer').html(counter);
  loadQuestion();
});
