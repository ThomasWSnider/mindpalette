import BaseController from "../utils/BaseController";


export class FlashcardsController extends BaseController {
  constructor() {
    super(`api/flashcards`)
    this.router
  }

  async getAllFlashcards(request, response, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
}