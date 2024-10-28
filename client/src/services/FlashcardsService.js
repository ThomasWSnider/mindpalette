import { Flashcard } from "@/models/Flashcard.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class FlashcardsService{

async createFlashcard(flashcardData){
  const response = await api.post("api/flashcards", flashcardData)
  const newFlashcard = new Flashcard(response.data)
  AppState.flashcards.push(newFlashcard)
}

async destroyFlashcard(flashcardId){
  await api.delete(`api/flashcards/${flashcardId}`)
  const flashcardToDestroyIndex = AppState.flashcards.findIndex((flashcard) => flashcard.id === flashcardId)
  AppState.flashcards.splice(flashcardToDestroyIndex, 1)
}

  async getFlashcardsByDeckId(deckId){
    AppState.flashcards.length = 0
    const response = await api.get(`api/flashcards/collections/${deckId}`)
    const flashcards = response.data.map((flashcard) => new Flashcard(flashcard))
    AppState.flashcards = flashcards
  }

}

export const flashcardsService = new FlashcardsService()