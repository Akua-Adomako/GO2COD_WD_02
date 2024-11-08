const questions = [
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12"
    },
    {
        question: "Solve for x: 3x + 2 = 11",
        options: ["2", "3", "4", "5"],
        correctAnswer: "3"
    },
    {
        question: "What is the area of a square with a side length of 6 cm?",
        options: ["12 cm²", "24 cm²", "30 cm²", "36 cm²"],
        correctAnswer: "36 cm²"
    },
    {
        question: "A car travels 150 km in 3 hours. What is its average speed?",
        options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        correctAnswer: "50 km/h"
    },
    {
        question: "If you buy 3 apples for $1.50 each, what is the total cost?",
        options: ["$3.00", "$4.50", "$5.00", "$6.00"],
        correctAnswer: "$4.50"
    },
    {
        question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
        options: ["26 cm", "30 cm", "40 cm", "45 cm"],
        correctAnswer: "26 cm"
    },
    {
        question: "Which of the following is a prime number?",
        options: ["4", "9", "15", "17"],
        correctAnswer: "17"
    },
    {
        question: "What is the value of 2^3?",
        options: ["4", "6", "8", "10"],
        correctAnswer: "8"
    },
    {
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: "180°"
    },
    {
        question: "A pizza is cut into 8 equal slices. You eat 3 slices. What fraction of the pizza is left?",
        options: ["1/4", "1/2", "5/8", "3/8"],
        correctAnswer: "5/8"
    },
    {
        question: "What is 9 + 6?",
        options: ["13", "14", "15", "16"],
        correctAnswer: "15"
    },
    {
        question: "What is the value of x if x - 4 = 9?",
        options: ["11", "9", "13", "14"],
        correctAnswer: "13"
    },
    {
        question: "What is the volume of a cube with a side length of 4 cm?",
        options: ["64 cm³", "16 cm³", "32 cm³", "8 cm³"],
        correctAnswer: "64 cm³"
    },
    {
        question: "If you divide 50 by 5, what is the quotient?",
        options: ["8", "9", "10", "11"],
        correctAnswer: "10"
    },
    {
        question: "Which of these numbers is divisible by 3?",
        options: ["14", "15", "16", "17"],
        correctAnswer: "15"
    },
    {
        question: "What is the next number in the series: 2, 4, 8, 16, ...?",
        options: ["32", "24", "20", "18"],
        correctAnswer: "32"
    },
    {
        question: "What is the median of the following numbers: 2, 5, 7, 10, 12?",
        options: ["5", "7", "8", "6"],
        correctAnswer: "7"
    },
    {
        question: "What is the square root of 49?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "If you subtract 15 from 30, what is the result?",
        options: ["10", "15", "20", "25"],
        correctAnswer: "15"
    },
    {
        question: "Which of the following is the smallest?",
        options: ["5/8", "1/2", "3/4", "7/8"],
        correctAnswer: "1/2"
    }
];



let score = 0;
let currentQuestionIndex = 0;
const answeredQuestions = {}; 

// Function to load the current question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const submitButton = document.getElementById('submit-button');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = ''; 

    // Create option buttons
    question.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-btn');
        optionButton.textContent = option;
        optionButton.onclick = () => handleOptionClick(optionButton, option);

        // Apply previously saved styles if the question was answered
        if (answeredQuestions[currentQuestionIndex]) {
            const savedAnswer = answeredQuestions[currentQuestionIndex];
            
            // Keep the incorrect answer selected and styled
            if (savedAnswer.selectedOption === option) {
                optionButton.classList.add(savedAnswer.isCorrect ? 'correct' : 'incorrect');
            }
            // Always show the correct answer with a distinct style
            if (option === question.correctAnswer) {
                optionButton.classList.add('correct');
            }
            optionButton.disabled = true; // Disable option once answered
        }

        optionsContainer.appendChild(optionButton);
    });

    // Show or hide the next/prev buttons
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'block';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
}

// Function to handle option click
function handleOptionClick(button, selectedOption) {
    const question = questions[currentQuestionIndex];
    const allOptionButtons = document.querySelectorAll('.option-btn');

    // Disable all buttons once an answer is selected
    allOptionButtons.forEach(btn => btn.disabled = true);

    // Check if the selected option is correct
    const isCorrect = selectedOption === question.correctAnswer;
    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        
        // Highlight the correct option
        const correctOptionButton = [...allOptionButtons].find(btn => btn.textContent === question.correctAnswer);
        correctOptionButton.classList.add('correct');
    }

    // Save the answer details
    answeredQuestions[currentQuestionIndex] = {
        selectedOption,
        isCorrect
    };
}

// Function to go to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Function to go to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Function to show the final score
function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Your score: ${score} out of ${questions.length}`;
    document.getElementById('quiz-container').innerHTML = ''; // Clear the quiz container

    const endOptions = document.createElement('div');
    
    // Play Again Button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.onclick = () => restartQuiz();
    playAgainButton.style.margin = '10px';
    
    // Main Menu Button
    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Go to Main Menu';
    mainMenuButton.onclick = () => goToMainMenu();
    mainMenuButton.style.margin = '10px';

    endOptions.appendChild(playAgainButton);
    endOptions.appendChild(mainMenuButton);
    document.getElementById('quiz-container').appendChild(scoreDisplay);
    document.getElementById('quiz-container').appendChild(endOptions);
}

// Function to restart the quiz
function restartQuiz() {
  window.location.href = 'maths.html';
}

// Function to go back to the main menu
function goToMainMenu() {
    window.location.href = '../index.html'; 
}

// Load the first question
loadQuestion();

// Event listeners for navigation buttons
document.getElementById('next-button').onclick = nextQuestion;
document.getElementById('prev-button').onclick = prevQuestion;
document.getElementById('submit-button').onclick = showScore;
