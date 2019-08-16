// intial values
let counter = 3;
let currentQuestion = 0;
let score = 0;
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
  if (isQuizOver) {
    console.log("game over");
    $('#game').html(`<p>Game over</p>`)
  }
  else {
    currentQuestion++;
    loadQuestion();
  }
}

function timeIsUp() {
  clearInterval(timer);
  losses++;
  nextQuestion();
}

function loadQuestion() {
  counter = 3;
  timer = setInterval(countdown, 1000)
  const question = quizQuestions[currentQuestion].question;
  const choices = quizQuestions[currentQuestion].choices;
  // $('#game').html('<h4>' + question + '</h4>') es5
  $('#time').html(`Timer: ${counter}`);
  $('#game').html(`<h4>  ${question}  </h4>
  ${loadChoices(choices)}
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
  const selectedAnswer = $(this).attr('data-answer')
  console.log('clicked', selectedAnswer);
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (selectedAnswer === correctAnswer) {
    //score goes up
    score++;
    console.log('you win');
    nextQuestion();
  } else {
    losses++;
    console.log('you lose');
    nextQuestion();
  }
});

function displayResults() {
  const result = `
  <p>You get ${score} questions right</p>
  <p>You missed ${losses} questions right</p>
  <p>Total Questions ${quizQuestions.length} questions right</p>
  <button>Reset Game</button>
  `
}

$('#game').html(result);


//start game
loadQuestion();
