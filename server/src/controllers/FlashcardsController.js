import { Auth0Provider } from "@bcwdev/auth0provider";
import { flashcardsService } from "../services/FlashcardsService";
import BaseController from "../utils/BaseController";


export class FlashcardsController extends BaseController {
  constructor() {
    super(`api/flashcards`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .create('',)
      .get('/:deckId', this.getFlashcardsByDeckId)
  }

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