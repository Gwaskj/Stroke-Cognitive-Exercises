const symbols = ["★", "●", "▲", "■", "◆", "♥"];
let cards = [];
let firstSelection = null;
let secondSelection = null;
let matchesFound = 0;
let attempts = 0;

const puzzleContainer = document.getElementById("puzzle");
const statusEl = document.getElementById("status");
const summaryEl = document.getElementById("summary");

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function initPuzzle() {
  const deck = shuffle([...symbols, ...symbols]);
  puzzleContainer.innerHTML = "";
  cards = [];
  matchesFound = 0;
  attempts = 0;
  updateStatus();

  deck.forEach((symbol, index) => {
    const btn = document.createElement("button");
    btn.className = "puzzle-button";
    btn.textContent = "";
    btn.setAttribute("data-symbol", symbol);
    btn.setAttribute("data-index", index);

    btn.addEventListener("click", () => handleSelection(btn));

    puzzleContainer.appendChild(btn);
    cards.push(btn);
  });
}

function handleSelection(btn) {
  if (btn.classList.contains("matched")) return;
  if (btn === firstSelection) return;

  btn.textContent = btn.getAttribute("data-symbol");
  btn.classList.add("selected");

  if (!firstSelection) {
    firstSelection = btn;
    return;
  }

  secondSelection = btn;
  attempts++;

  const firstSymbol = firstSelection.getAttribute("data-symbol");
  const secondSymbol = secondSelection.getAttribute("data-symbol");

  if (firstSymbol === secondSymbol) {
    firstSelection.classList.remove("selected");
    secondSelection.classList.remove("selected");
    firstSelection.classList.add("matched");
    secondSelection.classList.add("matched");
    matchesFound++;

    firstSelection = null;
    secondSelection = null;

    updateStatus();

    if (matchesFound === symbols.length) {
      statusEl.textContent = "Puzzle complete. Great work keeping your mind active.";
      updateSummary();
    }
  } else {
    setTimeout(() => {
      firstSelection.textContent = "";
      secondSelection.textContent = "";
      firstSelection.classList.remove("selected");
      secondSelection.classList.remove("selected");
      firstSelection = null;
      secondSelection = null;
      updateStatus();
    }, 700);
  }
}

function updateStatus() {
  statusEl.textContent = `Matches found: ${matchesFound} / ${symbols.length} | Attempts: ${attempts}`;
}

function updateSummary() {
  summaryEl.textContent =
    `You completed this matching exercise with ${attempts} attempts. ` +
    `These are activity and performance metrics only, not clinical measures.`;
}

initPuzzle();
