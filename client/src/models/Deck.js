import { DbItem } from "./DBItem.js";

export class Deck extends DbItem {
  constructor(data){
    super(data)
      this.creatorId = data.creatorId
      this.title = data.title
      this.description = data.description
      this.cardCount = data.cardCount
  }
}