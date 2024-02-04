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

  //Retrieve existing scores
  const savedData = localStorage.getItem("quizData");
  let savedScores = [];

  if (savedData) {
    savedScores = JSON.parse(savedData);
  }

  // Add the current score to the array
  savedScores.push({ initials, scoreTotal });

  // Save to localstorage
  localStorage.setItem('quizData', JSON.stringify(savedScores))
}

// Event listener for the start button
const startButton = document.getElementById("start-quiz");
startButton.addEventListener("click", startQuiz);


// Function to handle displaying high scores
function displayHighScores() {
  const scoresContainer = document.getElementById("scores-container");
  scoresContainer.innerHTML = ""; // Clear previous scores

  // Retrieve saved data from localStorage
  const savedData = localStorage.getItem("quizData");

  if (savedData) {
    const savedScores = JSON.parse(savedData);

    // Iterate over saved scores and create list items
    for (const score of savedScores) {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials}: ${score.scoreTotal}`;
      scoresContainer.appendChild(listItem);
    }
  }
}

// Event listener for the "High Scores" element
const highScoresElement = document.getElementById("high-scores");
highScoresElement.addEventListener("click", displayHighScores);
