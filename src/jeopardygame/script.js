// Example questions
const categories = {
    "History": [
      { question: "Who was the first US president?", answer: "George Washington", value: 100 },
      { question: "What year did WW2 end?", answer: "1945", value: 200 },
      { question: "Which empire built the Colosseum?", answer: "Roman", value: 300 },
    ],
    "Science": [
      { question: "What planet is known as the Red Planet?", answer: "Mars", value: 100 },
      { question: "What is H2O?", answer: "Water", value: 200 },
      { question: "What gas do humans need to breathe?", answer: "Oxygen", value: 300 },
    ],
    "Sports": [
      { question: "How many players on a soccer team?", answer: "11", value: 100 },
      { question: "What sport uses a puck?", answer: "Hockey", value: 200 },
      { question: "Where were the 2016 Olympics?", answer: "Rio", value: 300 },
    ]
  };
  
  const gameBoard = document.getElementById("game-board");
  const modal = document.getElementById("question-modal");
  const questionText = document.getElementById("question-text");
  const answerInput = document.getElementById("answer-input");
  const submitAnswerBtn = document.getElementById("submit-answer");
  const closeModalBtn = document.getElementById("close-modal");
  
  const teamScores = [0, 0, 0, 0];
  const scoreDisplays = [
    document.getElementById("score1"),
    document.getElementById("score2"),
    document.getElementById("score3"),
    document.getElementById("score4"),
  ];
  
  let currentTeam = 0; // 0 = Team 1, 1 = Team 2, etc.
  let currentAnswer = "";
  let currentValue = 0;
  
  const currentTeamLabel = document.getElementById("current-team");
  
  function updateTurn() {
    currentTeamLabel.textContent = `Team ${currentTeam + 1}`;
  }
  
  function buildBoard() {
    for (let category in categories) {
      // Add category header
      const catEl = document.createElement("div");
      catEl.classList.add("category");
      catEl.textContent = category;
      gameBoard.appendChild(catEl);
  
      // Add question tiles
      categories[category].forEach(q => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = q.value;
  
        tile.addEventListener("click", () => {
          questionText.textContent = q.question;
          currentAnswer = q.answer.toLowerCase();
          currentValue = q.value;
          modal.classList.remove("hidden");
          tile.classList.add("used");
        });
  
        gameBoard.appendChild(tile);
      });
    }
  }
  
  submitAnswerBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.toLowerCase().trim();
    if (userAnswer === currentAnswer) {
      alert(`✅ Correct! Team ${currentTeam + 1} earns ${currentValue} points.`);
      teamScores[currentTeam] += currentValue;
    } else {
      alert(`❌ Wrong! Correct answer: ${currentAnswer}\nTeam ${currentTeam + 1} loses ${currentValue} points.`);
      teamScores[currentTeam] -= currentValue;
    }
  
    // Update scoreboard
    scoreDisplays.forEach((el, i) => el.textContent = teamScores[i]);
  
    // Reset input
    answerInput.value = "";
    modal.classList.add("hidden");
  
    // Switch to next team
    currentTeam = (currentTeam + 1) % 4;
    updateTurn();
  });
  
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  buildBoard();
  updateTurn();
  