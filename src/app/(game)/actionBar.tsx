import Player from "@/game/player";
import Link from "next/link";

type ActionBarProps = {
  players: Player[];
  currentPlayer: Player;
};

export default function ActionBar({ players, currentPlayer }: ActionBarProps) {
  return (
    <nav className="flex my-5 items-center gap-2">
      <ol className="flex flex-1">
        {players.map((player) => (
          <li
            key={player.id}
            className={`bg-${player.color}-100 px-4 py-2 border-b-4 border-${
              player.color
            }-${player.id === currentPlayer.id ? "500" : "200"} transition`}
          >
            <span className={`font-semibold text-${player.color}-500 mr-4`}>
              {player.name}
            </span>

            <span className={`font font-semibold text-${player.color}-700`}>
              {player.points}
            </span>
          </li>
        ))}
      </ol>

      <Link className="underline" href="/new">
        Neues Spiel
      </Link>
      <Link className="underline" href="/settings">
        Einstellungen
      </Link>
    </nav>
  );
}
