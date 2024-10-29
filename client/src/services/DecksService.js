import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Deck } from "@/models/Deck.js"
import { AppState } from "@/AppState.js"


class DecksService {

  clearFocusedDeck(){
    AppState.focusedDeck = null
  }

async createNewDeck(deckData) {
  const response = await api.post("api/decks", deckData)
  const newDeck = new Deck(response.data)
  AppState.decks.push(newDeck)
}

async destroyDeck(deckId){
  await api.delete(`api/decks/${deckId}`)
  const deckToDeleteIndex = AppState.decks.findIndex((deck) => deck.id === deckId)
  AppState.decks.splice(deckToDeleteIndex, 1)
}

  async getUserDecks() {
    const response = await api.get('api/decks')
    const decks = response.data.map((deck) => new Deck(deck))
    AppState.decks = decks
  }

  async getDeckById(deckId) {
    AppState.focusedDeck = null
    const response = await api.get(`api/decks/${deckId}`)
    const focusedDeck = new Deck(response.data)
    AppState.focusedDeck = focusedDeck
  }
}

export const decksService = new DecksService()