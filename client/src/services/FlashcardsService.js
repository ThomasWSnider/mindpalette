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

async editFlashcard(flashcardId, editableFlashcardData){
  await api.put(`api/flashcards/${flashcardId}`, editableFlashcardData)
  editableFlashcardData.id = flashcardId
  const flashcardIndex = AppState.flashcards.findIndex((flashcard) => flashcard.id === editableFlashcardData.id)
  const editedFlashcard = new Flashcard(editableFlashcardData)
  AppState.flashcards.splice(flashcardIndex, 1, editedFlashcard)
}

  async getFlashcardsByDeckId(deckId){
    AppState.flashcards.length = 0
    const response = await api.get(`api/flashcards/collections/${deckId}`)
    const flashcards = response.data.map((flashcard) => new Flashcard(flashcard))
    AppState.flashcards = flashcards
  }

  setFlashcardToEdit(flashcardId){
    AppState.flashcardToEdit = null
    const flashcardToEdit = AppState.flashcards.find((flashcard) => flashcard.id === flashcardId)
    AppState.flashcardToEdit = flashcardToEdit
  }

}

export const flashcardsService = new FlashcardsService()