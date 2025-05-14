let username;
let userAns = "";
let index = 0;
let score = 0;
let srno = 1;
let btn = document.querySelector(".option");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<br>", "<lb>", "<line>"],
    correctAnswer: "<br>"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["background-color", "text-color", "color", "font-color"],
    correctAnswer: "color"
  },
  {
    question: "How do you select an element with the class name 'container' in CSS?",
    options: [".container", "#container", "container", "*container"],
    correctAnswer: ".container"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    correctAnswer: "<a>"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["string", "bold", "header", "font"],
    correctAnswer: "string"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    correctAnswer: "<script>"
  },
  {
    question: "Which method is used to output data in the console?",
    options: ["log()", "console.write()", "document.log()", "console.log()"],
    correctAnswer: "console.log()"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<picture>", "<src>"],
    correctAnswer: "<img>"
  }
];

function getQuestions() {
  const currentQuestion = quizQuestions[index];
  const questionElem = document.querySelector(".question");
  const optionsContainer = document.querySelector(".option");

  // Set the question text
  questionElem.innerText = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Add new options
  currentQuestion.options.forEach(option => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option-btn";
    optionDiv.innerText = option;
    optionsContainer.appendChild(optionDiv);
  });
}


function startGame() {
  username = document.querySelector(".username").value;
  if (username === "") {
    alert("Please enter your name");
  } else {
    document.querySelector(".start-btn").style.display = "none";
    document.querySelector(".container").style.display = "block";
    document.querySelector(".score").style.display = "none";
    document.querySelector(".question-section").style.display = "block"
    getQuestions();
  }
}

function gethistory() {
  document.querySelector(".start-btn").style.display = "none";
  document.querySelector(".history-container").style.display = "block";

  const data = JSON.parse(localStorage.getItem("Data")) || [];
  const tableBody = document.querySelector(".history-table");
  // console.log(tableBody)

    tableBody.innerHTML = "";

data.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.srno}</td>
      <td>${user.username}</td>
      <td>${user.date}</td>
      <td>${user.score}/10</td>
    `;

    tableBody.appendChild(row);
  });


}

function showStarPage() {
  // Reset all quiz-related variables
  index = 0;
  score = 0;
  userAns = "";

  // Hide the quiz and show the start button screen
  document.querySelector(".start-btn").style.display = "flex";
  document.querySelector(".container").style.display = "none";

  // Clear the username input field
  document.querySelector(".username").value = "";

}


function nextQuestion() {
  if (!userAns) {
    alert("Please select an option");
    return;
  }

  const userAnswer = userAns;
  const correctAnswer = quizQuestions[index].correctAnswer;
  if (userAnswer === correctAnswer) {
    score++;
  }

  index++;
  userAns = null; // Reset for next question

  if (index < quizQuestions.length) {
    getQuestions();
  } else {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}`;
    let quizData = JSON.parse(localStorage.getItem("Data")) || [];
    const data = {
      srno: srno,
      username: username,
      date: formattedDate,
      score: score
    };

    // Add new record
    quizData.push(data);

    // Save back to localStorage
    localStorage.setItem("Data", JSON.stringify(quizData));
    srno++;
    console.log(data); // Optional: to verify

    document.querySelector(".question-section").style.display = "none"
    document.querySelector(".score").style.display = "flex";
    document.querySelector('.user-name').innerText = `Thank you, ${username}.`
    document.querySelector('.points').innerText = `Your Score: ${score}/${quizQuestions.length}`
  }

}

function backToHome() {
  document.querySelector(".history-container").style.display = "none";
  document.querySelector(".start-btn").style.display = "flex";
}



btn.addEventListener("click", function (event) {
  if (event.target.className === "option-btn") {
    // Reset color of all options first
    let options = document.querySelectorAll(".option-btn");
    for (let i = 0; i < options.length; i++) {
      options[i].style.color = "black";
      options[i].style.background = "white"
      options[i].style.border = "1px solid black"

    }

    // Change color of clicked option
    // event.target.style.color = "white"; 
    event.target.style.background = " rgba(120, 120, 120, 0.264)"
    event.target.style.transition = "0.2s all ease-out"
    event.target.style.border = "none"

    // Save selected answer
    userAns = event.target.innerText;
    console.log(userAns)
  }
});
