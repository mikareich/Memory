import ALL_CARDS from "./allCards";
import Card from "./card";
import Player from "./player";
import EventListener from "./eventListener";

type EventListenerMap = {
  finished: [Game];
  cardFlipped: [Card];
  playerScored: [Player, Card, Card];
};

class Game extends EventListener<EventListenerMap> {
  public static validNumberOfCards(numberOfCards: number) {
    return numberOfCards % 2 !== 0 || numberOfCards < ALL_CARDS.length;
  }

  public static readonly ALL_CARDS = ALL_CARDS;

  public static generateDeck(numberOfCards: number): Card[] {
    const deck = [];
    const possibleCards = [...Game.ALL_CARDS];

    for (let i = 0; i < numberOfCards / 2; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCards.length);
      const randomCard = possibleCards[randomIndex];

      deck.push(
        new Card(randomCard.name, randomCard.src),
        new Card(randomCard.name, randomCard.src)
      );
      possibleCards.splice(randomIndex, 1);
    }

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }

  public readonly numberOfCards: number;
  public readonly players: Player[];
  public readonly deck: Card[];

  public get isFinished() {
    return this.deck.every((card) => card.isMatched);
  }

  public get currentPlayer() {
    return this.players[this.playerIndex % this.players.length];
  }

  private history: Card[] = [];
  private playerIndex = 0;
  private readonly startTime = Date.now();

  // even turn === start of a new turn
  private get isEvenTurn() {
    return this.history.length % 2 === 0;
  }

  private get lastFlippedCard() {
    return this.history.slice(-1)[0];
  }

  private get lastTwoFlippedCards() {
    return this.history.slice(-2);
  }

  constructor(numberOfCards: number, players: Player[]) {
    super();
    this.numberOfCards = numberOfCards;
    this.players = players;

    this.deck = Game.generateDeck(numberOfCards);
  }

  flipCard(cardId: string) {
    const card = this.getCardById(cardId);

    if (!card) throw new Error("Card not found");
    if (card.isFlipped || card.isMatched) return;

    card.flip();

    if (this.isEvenTurn) {
      this.lastTwoFlippedCards.forEach((card) => card.flip());
    } else {
      if (this.lastFlippedCard?.name === card.name) {
        this.lastFlippedCard.match();
        card.match();
        this.currentPlayer.points++;
        this.emit(
          "playerScored",
          this.currentPlayer,
          card,
          this.lastFlippedCard
        );

        if (this.isFinished) {
          this.emit("finished", this);
        }
      } else {
        this.playerIndex++;
      }
    }

    this.emit("cardFlipped", card);
    this.history.push(card);
  }

  getCardById(cardId: string) {
    return this.deck.find((card) => card.id === cardId);
  }
}

export default Game;
