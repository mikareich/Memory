import { v4 as uuid } from "uuid";
import { PLAYER_COLORS, PlayerColor } from "@/lib/utils";

class Player {
  public readonly id = uuid();
  public readonly name: string;
  public readonly color: PlayerColor;

  public points = 0;

  constructor(name: string, color?: PlayerColor) {
    this.name = name;

    this.color =
      color || PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
  }
}

export default Player;
