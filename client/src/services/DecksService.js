import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Deck } from "@/models/Deck.js"
import { AppState } from "@/AppState.js"


class DecksService {

async createNewDeck(deckData) {
  const response = await api.post("api/decks", deckData)
  const newDeck = new Deck(response.data)
  AppState.decks.push(newDeck)
}

  async getUserDecks() {
    const response = await api.get('api/decks')
    const decks = response.data.map((deck) => new Deck(deck))
    AppState.decks = decks
  }

  selectDeck(deckId){
    AppState.decks.find((deck) => deck.id == deckId)
  }
}

export const decksService = new DecksService()