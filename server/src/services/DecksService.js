import { dbContext } from "../db/DbContext"


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
}

export const decksService = new DecksService() 