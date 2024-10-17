import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"


class DecksService {

  async getUserDecks() {
    const response = await api.get('api/decks')
    logger.log('decks received', response);
    
  }
}

export const decksService = new DecksService()