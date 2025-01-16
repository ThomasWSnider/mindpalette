import { type } from "express/lib/response";
import { Schema } from "mongoose";

export const DeckSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  title: { type: String, minLength: 3, maxLength: 25, required: true },
  description: { type: String, maxLength: 200 },
  coverImg: { type: String, maxLength: 1000, default: "https://images.unsplash.com/photo-1513710281312-7a43f9cdbfcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", required: true },
  isStarterDeck: { type: Boolean, default: false, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

DeckSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})

DeckSchema.virtual("cardCount", {
  localField: "_id",
  ref: "Flashcard",
  foreignField: "deckId",
  count: true
})