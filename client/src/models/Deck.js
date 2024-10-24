import { DbItem } from "./DbItem.js"

export class Deck extends DbItem {
  constructor(data){
    super(data)
      this.creatorId = data.creatorId
      this.title = data.title
      this.description = data.description
      this.coverImg = data.coverImg
      this.cardCount = data.cardCount
  }
}