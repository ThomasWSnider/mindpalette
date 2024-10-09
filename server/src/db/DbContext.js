import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { DeckSchema } from "../models/Deck";
import { FlashCardSchema } from "../models/Flashcard";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Decks = mongoose.model("Deck", DeckSchema);
  Flashcards = mongoose.model("Flashcard", FlashCardSchema)
}

export const dbContext = new DbContext()
