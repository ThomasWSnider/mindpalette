import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"


class DecksService {

  async getUserDecks() {
    const response = await api.get('api/decks')
    const decks = response.data.map((deck) => new Deck(deck))
  }
}

export const decksService = new DecksService()