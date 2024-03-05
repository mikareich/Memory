import { CardProps } from "@/app/(game)/card";
import Game from "@/game/game";
import Player from "@/game/player";
import { useEffect, useState } from "react";

/*
 *  ++ State adapter between core game logic and react ui ++
 *  Returned props:
 *  - status: 'running' | 'paused' | 'finished'
 *  - deckIds: string[]
 *  - controller: (cardId: string) => void
 *
 *  Usage:
 *  ```ts
 *   const { status, deck, controller } = useGame() // später auch: pause(), players, currentPlayer, ... und useGame(gameId)
 *   <Card key={card.id} {...controller(card.id)} />
 *  ```
 */

export type Controller = (cardId: string) => CardProps;

export default function useGame() {
  const [status, setStatus] = useState<"running" | "finished">("running");
  const [deckIds, setDeck] = useState<string[]>([]);
  const [game, setGame] = useState(
    new Game(12, [new Player("Minu"), new Player("Mika")])
  );
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    game.currentPlayer
  );

  const updateDeck = () => {
    setCurrentPlayer(game.currentPlayer);
    setDeck(game.deck.map((card) => card.id));
  };
  const updatePlayers = () => setPlayers(game.players);

  const controller: Controller = (cardId: string) => {
    const card = game.getCardById(cardId);
    if (!card) throw new Error("Card not found");

    return {
      isFlipped: card.isFlipped,
      isMatched: card.isMatched,
      handleClick: game.flipCard.bind(game, card.id),
      content: card.name,
      contentSrc: card.src,
    };
  };

  useEffect(() => {
    updateDeck();
    updatePlayers();

    // register event listeners
    game.on("cardFlipped", updateDeck);
    game.on("playerScored", updatePlayers);
    game.on("finished", () => setStatus("finished"));
  }, [game]);

  return {
    status,
    deckIds,
    controller,
    players,
    currentPlayer,
  };
}
