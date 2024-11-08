const questions = [
    {
        question: "Which of the following is a noun?",
        options: ["Run", "Beautiful", "Car", "Quickly"],
        correctAnswer: "Car"
    },
    {
        question: "What is the correct past tense of 'go'?",
        options: ["Go", "Went", "Going", "Gone"],
        correctAnswer: "Went"
    },
    {
        question: "Which of the following is an adjective?",
        options: ["Sing", "Happily", "Jump", "Tall"],
        correctAnswer: "Tall"
    },
    {
        question: "Choose the correct sentence:",
        options: ["She can sings well", "She sing well", "She can sing well", "She sings well can"],
        correctAnswer: "She can sing well"
    },
    {
        question: "What is the plural form of 'child'?",
        options: ["Childs", "Children", "Childes", "Childrens"],
        correctAnswer: "Children"
    },
    {
        question: "What is the opposite of 'happy'?",
        options: ["Sad", "Excited", "Joyful", "Angry"],
        correctAnswer: "Sad"
    },
    {
        question: "Which word is a preposition?",
        options: ["Under", "Jump", "Sing", "Beautiful"],
        correctAnswer: "Under"
    },
    {
        question: "Choose the correct sentence:",
        options: ["I are going to the store", "I am going to the store", "I be going to the store", "I was going store"],
        correctAnswer: "I am going to the store"
    },
    {
        question: "What is the subject in the sentence: 'The cat sleeps on the couch'?",
        options: ["The", "Cat", "Sleeps", "Couch"],
        correctAnswer: "Cat"
    },
    {
        question: "Which of the following is a conjunction?",
        options: ["But", "Quickly", "Apple", "Sing"],
        correctAnswer: "But"
    },
    {
        question: "Which of the following sentences uses correct punctuation?",
        options: ["Hello how are you", "Hello, how are you?", "Hello how, are you?", "Hello? How are you"],
        correctAnswer: "Hello, how are you?"
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eaten", "Eats", "Ate", "Eating"],
        correctAnswer: "Ate"
    },
    {
        question: "Which of the following words is a verb?",
        options: ["Run", "House", "Quick", "Happiness"],
        correctAnswer: "Run"
    },
    {
        question: "What is the correct possessive form of 'dog'?",
        options: ["Dogs", "Dog's", "Dogs'", "Doges"],
        correctAnswer: "Dog's"
    },
    {
        question: "Which sentence is a question?",
        options: ["The sky is blue.", "Where are you going?", "She plays the piano.", "I love ice cream."],
        correctAnswer: "Where are you going?"
    },
    {
        question: "Which of the following is a correct use of 'their'?",
        options: ["Their going to the park.", "Their dog is cute.", "They are their for a walk.", "I like their car."],
        correctAnswer: "I like their car."
    },
    {
        question: "Which of these words is a synonym of 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correctAnswer: "Joyful"
    },
    {
        question: "What is the correct sentence?",
        options: ["She do not like pizza", "She don't like pizza", "She does not like pizza", "She is not like pizza"],
        correctAnswer: "She does not like pizza"
    },
    {
        question: "Which of the following is a simple sentence?",
        options: ["I went to the store and I bought apples.", "Although I was tired, I went for a run.", "I like ice cream.", "Even though he was late, he still went to work."],
        correctAnswer: "I like ice cream."
    },
    {
        question: "What is the correct form of the verb in the sentence: 'She ___ to school every day.'",
        options: ["Go", "Goes", "Gone", "Going"],
        correctAnswer: "Goes"
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
  window.location.href = 'english.html';
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
