import { Schema } from "mongoose";

export const FlashCardSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  question: { type: String, minLength: 1, maxLength: 200, required: true },
  answer: { type: String, minLength: 1, maxLength: 50, required: true },
  deckId: { type: Schema.ObjectId, required: true, ref: "Deck" }
}, { timestamps: true, toJSON: { virtuals: true } })

FlashCardSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})