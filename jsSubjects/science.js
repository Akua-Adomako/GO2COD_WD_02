const questions = [
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "H2"],
        correctAnswer: "H2O"
    },
    {
        question: "What is the center of an atom called?",
        options: ["Nucleus", "Electron", "Proton", "Neutron"],
        correctAnswer: "Nucleus"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Mars", "Venus", "Mercury"],
        correctAnswer: "Mercury"
    },
    {
        question: "What gas do plants take in for photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the main source of energy for the Earth?",
        options: ["The Moon", "The Sun", "The Stars", "Volcanoes"],
        correctAnswer: "The Sun"
    },
    {
        question: "Which part of the cell contains genetic material?",
        options: ["Cytoplasm", "Nucleus", "Mitochondria", "Ribosomes"],
        correctAnswer: "Nucleus"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        correctAnswer: "Au"
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "What is the process by which plants make their food?",
        options: ["Respiration", "Fermentation", "Photosynthesis", "Digestion"],
        correctAnswer: "Photosynthesis"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        correctAnswer: "Diamond"
    },
    {
        question: "What is the chemical formula for salt?",
        options: ["NaCl", "H2O", "CO2", "NaOH"],
        correctAnswer: "NaCl"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Brain", "Skin"],
        correctAnswer: "Skin"
    },
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Solar", "Oil"],
        correctAnswer: "Solar"
    },
    {
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8"
    },
    {
        question: "What type of rock is formed from cooling lava?",
        options: ["Sedimentary", "Metamorphic", "Igneous", "Fossilized"],
        correctAnswer: "Igneous"
    },
    {
        question: "What is the most common element in the Earth's crust?",
        options: ["Oxygen", "Silicon", "Iron", "Aluminum"],
        correctAnswer: "Oxygen"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["100°C", "90°C", "50°C", "212°C"],
        correctAnswer: "100°C"
    },
    {
        question: "What is the force that pulls objects toward the Earth?",
        options: ["Magnetism", "Friction", "Gravity", "Pressure"],
        correctAnswer: "Gravity"
    },
    {
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Electron", "Proton"],
        correctAnswer: "Atom"
    },
    {
        question: "What is the most abundant metal in the Earth's crust?",
        options: ["Iron", "Aluminum", "Copper", "Gold"],
        correctAnswer: "Aluminum"
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
  window.location.href = 'science.html';
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
