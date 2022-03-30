// selected card collection
import { codingTheme } from "./themes.js";

// game settings
const NUMBER_OF_CARDS = 16;
const PLAYER_NAMES = ["Player 1", "Player 2"];
const PLAYER_COLORS = ["red", "green"];

const players = PLAYER_NAMES.map((name, i) => ({
  name,
  score: 0,
  color: PLAYER_COLORS[i],
}));
const cards = [];
const cardHistory = [];
let playerIndex = 0;

const memoryContainer = document.querySelector(".memory-container");
const playerSPAN = document.querySelector(".player-name");

// create new memory
function createMemory() {
  const allPairs = codingTheme.pairs;
  // create cards
  for (let i = 0; i < NUMBER_OF_CARDS; i += 2) {
    const pairIndex = Math.floor(Math.random() * allPairs.length);
    const pair = allPairs[pairIndex];

    allPairs.splice(pairIndex, 1);

    // create card
    const card = {
      name: pair.name,
      class: pair.class,
      matched: false,
      flipped: false,
    };

    // add card to deck
    cards.push({ id: i, ...card }, { id: i + 1, ...card });
  }

  // shuffle deck
  cards.sort(() => Math.random() - 0.5);

  // add cards to dom
  cards.forEach((card) => {
    const cardElement = document.createElement("button");
    cardElement.dataset.id = card.id;
    cardElement.classList.add("memory-card");
    cardElement.innerHTML = `
      <div class="card-back">
        <i class="${codingTheme.unflippedClass}"></i>
      </div>
      <div class="card-front">
        <i class="${card.class}"></i>
      </div>
    `;

    memoryContainer.appendChild(cardElement);
    cardElement.addEventListener("click", () => {
      console.log(card);
      turnCard(card.id);
    });
  });
}

function updateCards() {
  cards.forEach((card) => {
    const cardElement = memoryContainer.querySelector(
      `button.memory-card[data-id="${card.id}"]`
    );

    cardElement.classList.toggle("flipped", card.flipped);
    cardElement.classList.toggle("matched", card.matched);
  });
}

function updateName() {
  playerSPAN.innerText = `${players[playerIndex].name} (${players[playerIndex].score})`;
}

function turnCard(cardId) {
  const card = cards.find((card) => card.id === cardId);
  const currentPlayer = players[playerIndex];
  // skip if card is already matched
  if (card.matched) return;

  if (cardHistory.length % 2 === 0) {
    updateName();
    // set color theme
    document.body.className = currentPlayer.color;
    // unflip previous card
    cards.forEach((card) => (card.flipped = false));
  } else {
    // check if card already flipped
    if (card.flipped) return;

    // check if card is a match
    const previousCard = cardHistory[cardHistory.length - 1];
    if (card.name === previousCard.name) {
      card.matched = true;
      previousCard.matched = true;

      document
        .querySelector(`[data-id="${card.id}"`)
        .classList.add(currentPlayer.color);
      document
        .querySelector(`[data-id="${previousCard.id}"`)
        .classList.add(currentPlayer.color);

      currentPlayer.score++;
      updateName();
      // update player
      if (playerIndex === 0) playerIndex = -1;
      else playerIndex--;
    }

    // update player index
    playerIndex++;
    if (playerIndex > PLAYER_NAMES.length - 1) playerIndex = 0;
  }

  card.flipped = true;

  cardHistory.push(card);
  updateCards();
}

createMemory();
