"use client";

import Game from "@/game/game";
import ActionBar from "./actionBar";
import Card from "./card";
import CardContainer from "./container";
import useGame from "@/hooks/useGame";

export default function SinglePlayerPage() {
  const { deckIds, controller, players, currentPlayer } = useGame();


  return (
    <main className="container">
      <ActionBar players={players} currentPlayer={currentPlayer} />

      <CardContainer>
        {deckIds.map((cardId) => (
          <Card key={cardId} {...controller(cardId)} />
        ))}
      </CardContainer>
    </main>
  );
}
