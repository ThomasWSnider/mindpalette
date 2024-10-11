import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class DecksService {
  async createNewDeck(deckData) {
    const newDeck = await dbContext.Decks.create(deckData)
    await newDeck.populate('cardCount')
    return newDeck
  }

  async destroyDeck(deckId, userId) {
    const deckToDestroy = await dbContext.Decks.findById(deckId)
    if (deckToDestroy.creatorId != userId) throw new Forbidden('You can not delete a deck you did not create')
    await deckToDestroy.deleteOne()
    return `${deckToDestroy.title} has been deleted successfully`
  }

  async editDeck(deckData, userId) {
    const deckToEdit = await dbContext.Decks.findById(deckData.id)
    if (deckToEdit.creatorId != userId) throw new Forbidden('You can not edit a deck you did not create')
    deckToEdit.creatorId = deckToEdit.creatorId
    deckToEdit.title = deckData.title || deckToEdit.title
    deckToEdit.description = deckData.description || deckToEdit.description
    await deckToEdit.save()
    return `${deckToEdit.title} edited successfully`
  }

  async getAllUserDecks(userId) {
    const userDecks = await dbContext.Decks.find({ creatorId: userId }).populate('cardCount')
    return userDecks
  }

  async getDeckById(deckId, userId) {
    const deck = await dbContext.Decks.findById(deckId).populate('cardCount')
    if (deck.creatorId != userId) throw new Forbidden(`You may not access a deck you did not create`)
    return deck
  }

}

export const decksService = new DecksService