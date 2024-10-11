import { type } from "express/lib/response";
import { Schema } from "mongoose";

export const DeckSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  title: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, maxLength: 200 },
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