import { v4 as uuid } from "uuid";

class Card {
  public readonly id = uuid();
  public readonly name: string;
  public readonly src: string;

  public isFlipped = false;
  public isMatched = false;

  constructor(name: string, src: string) {
    this.name = name;
    this.src = src;
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  match() {
    this.isMatched = true;
  }
}

export default Card;
