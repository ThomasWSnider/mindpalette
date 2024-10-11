import { Auth0Provider } from "@bcwdev/auth0provider";
import { flashcardsService } from "../services/FlashcardsService";
import BaseController from "../utils/BaseController";


export class FlashcardsController extends BaseController {
  constructor() {
    super(`api/flashcards`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFlashcard)
      .get('/collections/:deckId', this.getFlashcardsByDeckId)
      .get('/:flashcardId', this.getFlashcardById)
      .put('/:flashcardId', this.editFlashcard)
      .delete('/:flashcardId', this.destroyFlashcard)
  }
  // Create a new Flashcard
  async createFlashcard(request, response, next) {
    try {
      const flashcardData = request.body
      flashcardData.creatorId = request.userInfo.id
      const newFlashcard = await flashcardsService.createFlashcard(flashcardData)
      response.send(newFlashcard)
    } catch (error) {
      next(error)
    }
  }
  // Delete an existing Flashcard
  async destroyFlashcard(request, response, next) {
    try {
      const flashcardId = request.params.flashcardId
      const userId = request.userInfo.id
      const message = await flashcardsService.destroyFlashcard(flashcardId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
  // Update existing Flashcard data
  async editFlashcard(request, response, next) {
    try {
      const userId = request.userInfo.id
      const flashcardData = request.body
      flashcardData.id = request.params.flashcardId
      const message = await flashcardsService.editFlashcard(flashcardData, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
  // Fetch specific Flashcard's data
  async getFlashcardById(request, response, next) {
    try {
      const userId = request.userInfo.id
      const flashcardId = request.params.flashcardId
      const flashcard = await flashcardsService.getFlashcardById(flashcardId, userId)
      response.send(flashcard)
    } catch (error) {
      next(error)
    }
  }
  // Fetch all Flashcards tied to a specific deck
  async getFlashcardsByDeckId(request, response, next) {
    try {
      const userId = request.userInfo.id
      const deckId = request.params.deckId
      const flashcards = await flashcardsService.getFlashcardsByDeckId(deckId, userId)
      response.send(flashcards)
    } catch (error) {
      next(error)
    }
  }
}