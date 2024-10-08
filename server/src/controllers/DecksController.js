import { decksService } from "../services/DecksService"
import BaseController from "../utils/BaseController"


export class DecksController extends BaseController {
  constructor() {
    super('api/decks')
    this.router
  }

  async createNewDeck(request, response, next) {
    try {
      const user = request.userInfo
      const deckData = request.body
      deckData.creatorId = user.id
      const newDeck = await decksService.createNewDeck(deckData)
      response.send(newDeck)
    } catch (error) {
      next(error)
    }
  }
}