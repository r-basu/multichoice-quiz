// Define variables
let scoreTotal = 0;
let timer = 75;
let currentQuestionIndex = 0;
let timerInterval;

const questions = [
  {
    question: "The condition in an if/else statement is enclosed with _____",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
];

// Function to start the quiz
function startQuiz() {
  timerInterval = setInterval(updateTimer, 1000);
  showQuestions(currentQuestionIndex);
}

// Function to display the current question and options
function showQuestions(index) {
  if (index >= questions.length) {
    quizComplete();
    return;
  }

  const questionContainer = document.getElementById("question-container");
  const currentQuestion = questions[index];

  if (currentQuestion) {
    questionContainer.innerText = currentQuestion.question;
    const questOptions = document.getElementById("answer-options");
    questOptions.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.innerText = option;
      optionElement.addEventListener("click", () => {
        checkAnswer(option, currentQuestion.correctAnswer);
      });
      questOptions.appendChild(optionElement);
    });
  }
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer) {
  const resultEl = document.getElementById("result");
  if (selectedAnswer === correctAnswer) {
    scoreTotal++;
    resultEl.innerText = "Correct Answer!";
  } else {
    timer -= 15;
    resultEl.innerText = "Wrong Answer! Minus 15 seconds!";
  }

  currentQuestionIndex++;
  showQuestions(currentQuestionIndex);
}

// Function to update the timer
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.innerText = timer;

  if (timer <= 0) {
    clearInterval(timerInterval);
    quizComplete();
  }

  timer--;
}

// Function to handle quiz completion
function quizComplete() {
  clearInterval(timerInterval);

  const scoreContainer = document.getElementById("scores-container");
  scoreContainer.innerText = `Final Score: ${scoreTotal}`;

  const saveScoreButton = document.getElementById("save-score");
  saveScoreButton.addEventListener("click", saveScore);
}

function saveScore() {
  const initialsInput = document.getElementById("initials-input");
  const initials = initialsInput.value;

  // Save the score using the initials and scoreTotal
  const data = {
    initials,
    scoreTotal,
  }

  const dataString = JSON.stringify(data)
  localStorage.setItem('quizData', dataString)
}

// Event listener for the start button
const startButton = document.getElementById("start-quiz");
startButton.addEventListener("click", startQuiz);
