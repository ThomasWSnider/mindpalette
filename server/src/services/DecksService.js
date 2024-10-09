import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class DecksService {
  async createNewDeck(deckData) {
    const newDeck = await dbContext.Decks.create(deckData)
    await newDeck.populate('cardCount')
    return newDeck
  }

  async getAllUserDecks(userId) {
    const userDecks = await dbContext.Decks.find({ creatorId: userId }).populate('cardCount')
    return userDecks
  }

  async getDeckById(deckId, userId) {
    const deck = await dbContext.Decks.findById(deckId).populate('cardCount')
    if (deck.creatorId != userId) throw new Forbidden(`No deck found with an id of ${deckId}`)
    return deck
  }

}

export const decksService = new DecksService() 