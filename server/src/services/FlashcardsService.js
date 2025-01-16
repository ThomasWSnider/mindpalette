import { dbContext } from "../db/DbContext"
import { Forbidden, NotFound } from "../utils/Errors"
import { decksService } from "./DecksService"


class FlashcardsService {
  // Checks user access to Deck before adding a Flashcard to it
  async createFlashcard(flashcardData) {
    await decksService.getDeckById(flashcardData.deckId, flashcardData.creatorId)
    const flashcards = await dbContext.Flashcards.find({ deckId: flashcardData.deckId })
    if (flashcards.length > 50) throw new Forbidden('You cannot create more than 50 flashcards in a deck')
    await decksService.getDeckById(flashcardData.deckId, flashcardData.creatorId)
    const newFlashcard = await dbContext.Flashcards.create(flashcardData)
    return newFlashcard
  }
  // Validates user access before deleting flashcard from a deck
  async destroyFlashcard(flashcardId, userId) {
    const flashcardToDestroy = await this.getFlashcardById(flashcardId, userId)
    await flashcardToDestroy.deleteOne()
    return `Flashcard deleted successfully`
  }
  // Validates user access before editing Flashcard Data
  async editFlashcard(flashcardData, userId) {
    const flashcardToEdit = await this.getFlashcardById(flashcardData.id, userId)
    flashcardToEdit.question = flashcardData.question || flashcardToEdit.question
    flashcardToEdit.answer = flashcardData.answer || flashcardToEdit.answer
    await flashcardToEdit.save()
    return `Flashcard edited successfully`
  }
  // Validates user access before fetching specific Flashcard
  async getFlashcardById(flashcardId, userId) {
    const flashcard = await dbContext.Flashcards.findById(flashcardId)
    if (!flashcard) throw new NotFound(`No flashcard found with the id of ${flashcardId}`)
    if (flashcard.creatorId != userId) throw new Forbidden('You cannot access a flashcard you did not create')
    return flashcard
  }
  // Validates user access before fetching all Flashcards tied to specific deck
  async getFlashcardsByDeckId(deckId, userId) {
    const deckToAccess = await decksService.getDeckById(deckId, userId)
    const flashcards = await dbContext.Flashcards.find({ deckId: deckId })
    if (flashcards.length === 0) throw new NotFound(`No flashcards found for ${deckToAccess.title}`)
    return flashcards
  }

  async getFlashcardsForStarterDeck(deckId) {
    const deckToAccess = await decksService.getStarterDeckById(deckId)
    const flashcards = await dbContext.Flashcards.find({ deckId: deckId })
    return flashcards
  }

}

export const flashcardsService = new FlashcardsService