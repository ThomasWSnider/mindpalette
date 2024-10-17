import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Deck } from "@/models/Deck.js"
import { AppState } from "@/AppState.js"


class DecksService {

  async getUserDecks() {
    const response = await api.get('api/decks')
    const decks = response.data.map((deck) => new Deck(deck))
    AppState.decks = decks
  }
}

export const decksService = new DecksService()