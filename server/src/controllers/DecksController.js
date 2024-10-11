import { Auth0Provider } from "@bcwdev/auth0provider"
import { decksService } from "../services/DecksService"
import BaseController from "../utils/BaseController"


export class DecksController extends BaseController {
  constructor() {
    super('api/decks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllUserDecks)
      .get('/:deckId', this.getDeckById)
      .post("", this.createNewDeck)
      .put('/:deckId', this.editDeck)
      .delete('/:deckId', this.destroyDeck)
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

  async destroyDeck(request, response, next) {
    try {
      const userId = request.userInfo.id
      const deckId = request.params.deckId
      const message = await decksService.destroyDeck(deckId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async editDeck(request, response, next) {
    try {
      const userId = request.userInfo.id
      const deckData = request.body
      deckData.id = request.params.deckId
      const message = await decksService.editDeck(deckData, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getAllUserDecks(request, response, next) {
    try {
      const userId = request.userInfo.id
      const decks = await decksService.getAllUserDecks(userId)
      response.send(decks)
    } catch (error) {
      next(error)
    }
  }

  async getDeckById(request, response, next) {
    try {
      const userId = request.userInfo.id
      const deckId = request.params.deckId
      const deck = await decksService.getDeckById(deckId, userId)
      response.send(deck)
    } catch (error) {
      next(error)
    }
  }

}