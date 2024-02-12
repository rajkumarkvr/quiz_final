const final_score = document.querySelector(".final-score")
var urlParams = new URLSearchParams(window.location.search);

// Get the value of a specific parameter
var score = urlParams.get('score');


final_score.innerText = score;