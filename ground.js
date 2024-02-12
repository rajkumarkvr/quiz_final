const overall_categories = ["technology", "food", "science", "history"];
const options_container = document.querySelector(".options-stack");
const question_name = document.querySelector(".question-name");
const next_btn = document.querySelector(".next-btn");
const time = document.querySelector(".time");

const current_question_total = document.querySelector(
  ".current-question-total"
);
let technology_questions = `
[
    {
      "question": "What does HTML stand for?",
      "options": [
        "HyperText Markup Language",
        "High-Level Text Management Language",
        "HyperTransfer Markup Language",
        "HyperText Makeup Language"
      ],
      "answer_index": 0,
      "answer": "HyperText Markup Language"
    },
    {
      "question": "Which programming language is often used for building mobile applications?",
      "options": ["Java", "Swift", "Python", "Ruby"],
      "answer_index": 1,
      "answer": "Swift"
    },
    {
      "question": "What is the purpose of a CSS (Cascading Style Sheets)?",
      "options": [
        "To define the structure of a webpage",
        "To provide interactivity on a webpage",
        "To style the visual presentation of a webpage",
        "To handle server-side logic"
      ],
      "answer_index": 2,
      "answer": "To style the visual presentation of a webpage"
    },
    {
      "question": "Which company developed the popular programming language JavaScript?",
      "options": ["Microsoft", "Apple", "Mozilla", "Google"],
      "answer_index": 2,
      "answer": "Mozilla"
    },
    {
      "question": "What does the acronym VPN stand for?",
      "options": [
        "Virtual Private Network",
        "Very Personal Network",
        "Virtual Programming Network",
        "Visual Processing Node"
      ],
      "answer_index": 0,
      "answer": "Virtual Private Network"
    }
  ]
`;
let tech_ques = JSON.parse(technology_questions);
let current_question_number = -1;
let qno = 1;
let marks_per_question = 10;
let mark = 0;
let seconds = 10;
let user_selected = "";
const addEvent = () => {
  const opt = document.querySelectorAll(".option");
  console.log(opt);

  opt.forEach((o) => {
    o.addEventListener("click", (e) => {
      let status = false;
      opt.forEach((s) => {
        if (s.classList.contains("active")) {
          status = true;
        }
        s.classList.remove("active")
      });
      console.log(e.target.innerText);
     
        o.classList.toggle("active");
        user_selected = e.target.innerText;
        console.log(user_selected)
      
    
    });
  });
};

const checkAnswer = () => {
  const curr_q_info = tech_ques[current_question_number];
  if (curr_q_info.answer == user_selected) {
    mark += marks_per_question;
    console.log(mark);
  }
};

const changeCurrentQ = () => {
  if (current_question_number < 5) {
    seconds = 10;
    current_question_total.innerText = current_question_number + 1;
   
  }
  if (current_question_number > 4) {
    next_btn.innerText = "Finish";
    window.location.href = `congrats.html?score=${mark}`;
    // let result = document.createElement("h1");
    // result.innerText = "Your total mark is:" + mark;
    // document.body.appendChild(result)
    clearInterval(interval);
  }

  let current_question_info = tech_ques[current_question_number];
  let options = tech_ques[current_question_number].options;
  question_name.innerText = current_question_info.question;
  options_container.innerHTML = "";
  options.forEach((option) => {
    var option_ = `<div class="option" id="opt-1"><p>${option}</p></div>`;
    let div = document.createElement("div");
    div.innerHTML = option_;
    console.log(options_container);
    options_container.appendChild(div);
  });
  addEvent();
};
document.addEventListener("DOMContentLoaded", () => {
  current_question_number++;
  changeCurrentQ();
});

const handleChangeQuestion = () => {
  checkAnswer();
  current_question_number += 1;
  changeCurrentQ();
  console.log("clicked");
};

next_btn.addEventListener("click", handleChangeQuestion);

//setting timer

const timer = () => {
  if (seconds <= 0) {
    checkAnswer();
    seconds = 10;
    current_question_number++;
    changeCurrentQ();
  } else {
    seconds--;
  }

  time.innerText = seconds;
};
var interval = setInterval(timer, 1000);
