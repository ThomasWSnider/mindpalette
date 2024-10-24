import { Flashcard } from "@/models/Flashcard.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class FlashcardsService{

  async getFlashcardsByDeckId(deckId){
    const response = await api.get(`api/flashcards/collections/${deckId}`)
    const flashcards = response.data.map((flashcard) => new Flashcard(flashcard))
    AppState.flashcards = flashcards
  }

}

export const flashcardsService = new FlashcardsService()