import { dbContext } from "../db/DbContext"
import { Forbidden, NotFound } from "../utils/Errors"


class DecksService {
  // Creates new Deck
  async createNewDeck(deckData) {
    const userDeckCount = await this.getAllUserDecks(deckData.creatorId, true)
    if (userDeckCount.length > 20) throw new Forbidden('You may not create more than 20 decks')
    const newDeck = await dbContext.Decks.create(deckData)
    await newDeck.populate('cardCount')
    return newDeck
  }
  // Checks user access before deleting a specific Deck
  async destroyDeck(deckId, userId) {
    const deckToDestroy = await dbContext.Decks.findById(deckId)
    if (deckToDestroy.creatorId != userId) throw new Forbidden('You can not delete a deck you did not create')
    await deckToDestroy.deleteOne()
    return `${deckToDestroy.title} has been deleted successfully`
  }
  // Checks user access before modifying Deck data
  async editDeck(deckData, userId) {
    const deckToEdit = await dbContext.Decks.findById(deckData.id)
    if (deckToEdit.creatorId != userId) throw new Forbidden('You can not edit a deck you did not create')
    deckToEdit.title = deckData.title || deckToEdit.title
    deckToEdit.description = deckData.description || deckToEdit.description
    await deckToEdit.save()
    return `${deckToEdit.title} edited successfully`
  }
  // Checks user access before fetching all decks tied to an account
  async getAllUserDecks(userId, creatingDeck) {
    const userDecks = await dbContext.Decks.find({ creatorId: userId }).populate('cardCount')
    if (userDecks.length === 0 && !creatingDeck) throw new NotFound('No decks found for this account')
    return userDecks
  }
  // Checks user access before fetching a specific Deck by its Id
  async getDeckById(deckId, userId) {
    const deck = await dbContext.Decks.findById(deckId).populate('cardCount')
    if (!deck) throw new NotFound(`No deck found with the id of ${deckId}`)
    if (deck.creatorId != userId) throw new Forbidden(`You may not access a deck you did not create`)
    return deck
  }

}

export const decksService = new DecksService