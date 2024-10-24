import { DbItem } from "./DbItem.js";

export class Flashcard extends DbItem {
  constructor(data){
    super(data)
    this.creatorId = data.creatorId
    this.question = data.question
    this.answer = data.answer
    this.deckId = data.deckId
  }
}