// intial values
let counter = 5;
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

function displayResult() {
  const result = `
 <h2>Game over</h2>
  <p>You got ${score} /${quizQuestions.length} questions right</p>
  <p>You missed ${losses}/${quizQuestions.length} questions</p>
  <p>You got ${score / quizQuestions.length * 100}% of the questions right</p>
  <button class="btn btn-primary" id="reset">Reset Game</button>
  `;
  $('#game').html(result);
  console.log(`score : ${score}, losses: ${losses} out of ${quizQuestions.length} questions `)
}
// function reset() {
$(document).on('click', '#reset', function () {
  console.log('reset clicked')
  counter = 5;
  currentQuestion = 0;
  score = 0;
  losses = 0;
  timer = null;
  loadQuestion();
})
// };



//start game
loadQuestion();
