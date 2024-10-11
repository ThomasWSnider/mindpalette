import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { decksService } from "./DecksService"


class FlashcardsService {


  async createFlashcard(flashcardData) {
    await decksService.getDeckById(flashcardData.deckId, flashcardData.creatorId)
    const newFlashcard = await dbContext.Flashcards.create(flashcardData)
    return newFlashcard
  }

  async destroyFlashcard(flashcardId, userId) {
    const flashcardToDestroy = await this.getFlashcardById(flashcardId, userId)
    await flashcardToDestroy.deleteOne()
    return `Flashcard deleted successfully`
  }

  async editFlashcard(flashcardData, userId) {
    const flashcardToEdit = await this.getFlashcardById(flashcardData.id, userId)
    flashcardToEdit.creatorId = flashcardToEdit.creatorId
    flashcardToEdit.deckId = flashcardToEdit.deckId
    flashcardToEdit.question = flashcardToEdit.question || flashcardData.question
    flashcardToEdit.answer = flashcardToEdit.answer || flashcardData.answer
    await flashcardToEdit.save()
    return `Flashcard edited successfully`
  }

  async getFlashcardById(flashcardId, userId) {
    const flashcard = await dbContext.Flashcards.findById(flashcardId)
    if (flashcard.creatorId != userId) throw new Forbidden('You cannot access a flashcard you did not create')
    return flashcard
  }

  async getFlashcardsByDeckId(deckId, userId) {
    const deckToAccess = await decksService.getDeckById(deckId, userId)
    const flashcards = await dbContext.Flashcards.find({ deckId: deckId })
    return flashcards
  }

}

export const flashcardsService = new FlashcardsService