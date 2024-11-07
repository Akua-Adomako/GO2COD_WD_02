const questions = [
    {
        question: "What does ICT stand for?",
        options: ["Information and Communication Technology", "Internet and Computer Technology", "Internal Communication Technology", "Information and Computer Technology"],
        correctAnswer: "Information and Communication Technology"
    },
    {
        question: "Which of the following is an example of input hardware?",
        options: ["Monitor", "Keyboard", "Printer", "Speaker"],
        correctAnswer: "Keyboard"
    },
    {
        question: "Which programming language is commonly used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which of the following is a cloud storage service?",
        options: ["Google Drive", "Microsoft Excel", "Adobe Photoshop", "VLC Media Player"],
        correctAnswer: "Google Drive"
    },
    {
        question: "Which of the following is not an operating system?",
        options: ["Windows", "MacOS", "Android", "Microsoft Office"],
        correctAnswer: "Microsoft Office"
    },
    {
        question: "What is the primary purpose of an antivirus program?",
        options: ["To store files", "To protect from malware", "To run applications", "To browse the internet"],
        correctAnswer: "To protect from malware"
    },
    {
        question: "Which of these is a type of software?",
        options: ["Microsoft Word", "Motherboard", "CPU", "Printer"],
        correctAnswer: "Microsoft Word"
    },
    {
        question: "What is the full form of the URL?",
        options: ["Universal Resource Locator", "Uniform Resource Locator", "Uniform Retrieval Locator", "Universal Retrieval Locator"],
        correctAnswer: "Uniform Resource Locator"
    },
    {
        question: "Which of the following is an example of output hardware?",
        options: ["Keyboard", "Monitor", "Scanner", "Microphone"],
        correctAnswer: "Monitor"
    },
    {
        question: "Which of these is an example of a web browser?",
        options: ["Google Chrome", "Adobe Photoshop", "Microsoft Word", "Windows Explorer"],
        correctAnswer: "Google Chrome"
    },
    {
        question: "What does the 'www' in a web address stand for?",
        options: ["Wide World Web", "World Wide Web", "Web World Wide", "Web World Web"],
        correctAnswer: "World Wide Web"
    },
    {
        question: "Which of the following is used to store data on a computer permanently?",
        options: ["RAM", "CPU", "Hard Drive", "Cache"],
        correctAnswer: "Hard Drive"
    },
    {
        question: "Which of these is a type of database?",
        options: ["Microsoft Word", "SQL", "Google Chrome", "Windows"],
        correctAnswer: "SQL"
    },
    {
        question: "What is the main function of a router in a network?",
        options: ["To store data", "To route data between devices", "To increase the speed of the network", "To display content on screen"],
        correctAnswer: "To route data between devices"
    },
    {
        question: "Which of the following is an example of a digital storage medium?",
        options: ["DVD", "Paper", "Ink", "Pen"],
        correctAnswer: "DVD"
    },
    {
        question: "What is the purpose of a firewall in a computer network?",
        options: ["To store data", "To monitor internet speed", "To block unauthorized access", "To back up files"],
        correctAnswer: "To block unauthorized access"
    },
    {
        question: "Which of the following is an example of an input device?",
        options: ["Monitor", "Mouse", "Printer", "Speaker"],
        correctAnswer: "Mouse"
    },
    {
        question: "Which of these is an example of an operating system?",
        options: ["Windows", "Google", "Facebook", "Amazon"],
        correctAnswer: "Windows"
    },
    {
    question: "Which of the following is used to connect multiple computers in a network?",
    options: ["Router", "Keyboard", "Monitor", "Printer"],
    correctAnswer: "Router"
   },
    {
        question: "Which of the following is a function of a computer's CPU?",
        options: ["To store files", "To execute instructions", "To display images", "To connect to the internet"],
        correctAnswer: "To execute instructions"
    }
];




let score = 0;
let currentQuestionIndex = 0;

// Function to load the current question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const submitButton = document.getElementById('submit-button');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Create option buttons
    question.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-btn');
        optionButton.textContent = option;
        optionButton.onclick = () => handleOptionClick(optionButton, option);
        optionsContainer.appendChild(optionButton);
    });

    // Show or hide the next/prev buttons
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block'; // Show submit button at the last question
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none'; // Hide submit button if not last question
    }

    // Disable previous button for the first question
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
}

// Function to handle option click
function handleOptionClick(button, selectedOption) {
    const question = questions[currentQuestionIndex];
    const allOptionButtons = document.querySelectorAll('.option-btn');

    // Disable all buttons once an answer is selected
    allOptionButtons.forEach(button => button.disabled = true);

    // Check if the selected option is correct
    if (selectedOption === question.correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        // Highlight the correct answer
        const correctOptionButton = [...allOptionButtons].find(btn => btn.textContent === question.correctAnswer);
        correctOptionButton.classList.add('correct');
    }
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

// Function to show the score at the end
function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Your score: ${score} out of ${questions.length}`;
    document.getElementById('quiz-container').innerHTML = ''; // Clear the quiz container

    // Create a new div for the "Play Again" and "Main Menu" buttons
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

    // Add the buttons to the container
    endOptions.appendChild(playAgainButton);
    endOptions.appendChild(mainMenuButton);
    document.getElementById('quiz-container').appendChild(scoreDisplay);
    document.getElementById('quiz-container').appendChild(endOptions);
}

// Function to restart the quiz
function restartQuiz() {
  window.location.href = 'ict.html';
}

// Function to go back to the main menu
function goToMainMenu() {
    window.location.href = '../index.html'; 
}


// Load the first question
loadQuestion();

// Add event listeners for navigation buttons
document.getElementById('next-button').onclick = nextQuestion;
document.getElementById('prev-button').onclick = prevQuestion;
document.getElementById('submit-button').onclick = showScore;
