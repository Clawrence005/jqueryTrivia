// intial values
let counter = 15;
let currentQuestion = 0;
let wins = 0;
let losses = 0;
let timer;

function countdown() {
  counter--;
  $('#time').html(`Timer: ${counter}`);
  if (counter === 0) {
    timeIsUp();
  }
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

function timeIsUp() {
  clearInterval(timer);
  losses++;
  $('#time').hide()
  loadImage('lose');
  setTimeout(nextQuestion, 3 * 1000);
}

function loadQuestion() {
  $('#time').show()
  counter = 15;
  timer = setInterval(countdown, 1000)
  const question = quizQuestions[currentQuestion].question;
  const choices = quizQuestions[currentQuestion].choices;
  // $('#game').html('<h4>' + question + '</h4>') es5
  $('#time').html(`Timer: ${counter}`);
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

// answers click handler
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

function displayResult() {
  const result = `
 <h2>Game over</h2> 
  <p>You got ${wins / quizQuestions.length * 100}% of the questions right</p>
  <p>You got ${wins} /${quizQuestions.length} questions right</p>
  <p>You missed ${losses}/${quizQuestions.length} questions</p>
  <button class="btn btn-primary" id="reset">Reset Game</button>
  `;
  $('#game').html(result);
  console.log(`score : ${wins}, losses: ${losses} out of ${quizQuestions.length} questions `)
}
// function reset() {
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

const correctImageArray = [
  './assets/gifs/right1.gif',
  './assets/gifs/right2.gif',
  './assets/gifs/right3.gif',
  './assets/gifs/right4.gif',
  './assets/gifs/right1.webp',
  './assets/gifs/right2.webp',
];

const wrongImageArray = [
  './assets/gifs/wrong1.gif',
  './assets/gifs/wrong2.gif',
  './assets/gifs/wrong3.gif',
  './assets/gifs/wrong4.gif',
  './assets/gifs/wrong5.gif',

]

function loadImage(status) {
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (status === 'win') {
    $('#game').html(`
<p class="preload-image">Congratulations, you picked the correct answer!</p>
<img src="${showRandomImage(correctImageArray)}">
<p class="preload-image">The correct answer is <strong>${correctAnswer}</strong></p>

`);
  } else {
    $('#game').html(`
    <p class="preload-image"> Nope You picked the wrong answer! </p>
     <img src=${showRandomImage(wrongImageArray)}>
    <p class="preload-image">The correct answer is <strong>${correctAnswer}</strong></p>
   
    `);
  }
}
//image arrays

// creates a random image index number of which ever image array is passed in.
function showRandomImage(imageArray) {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  const randomImage = imageArray[randomIndex];
  return randomImage;
}
// intializes the game once button is pressed
$('#start').click(function () {
  $('#start').remove();
  $('#timer').html(counter);
  loadQuestion();
});

// Tell Me About Yourself (This should be read as Why should I hire you? What do you bring to this position from your past experience and education?)


// What are your career goals? (Think about this question as a way to tell an employer how you would perform as a developer and be realistic about where you are at in your career right now.)