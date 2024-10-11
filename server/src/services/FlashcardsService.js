import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { decksService } from "./DecksService"


class FlashcardsService {


  async createFlashcard(flashcardData) {
    const newFlashcard = await dbContext.Flashcards.create(flashcardData)
    return newFlashcard
  }
  async getFlashcardsByDeckId(deckId, userId) {
    const deckToAccess = await decksService.getDeckById(deckId, userId)
    const flashcards = await dbContext.Flashcards.find({ deckId: deckId })
    return flashcards
  }
}

export const flashcardsService = new FlashcardsService