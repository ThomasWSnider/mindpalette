import { Schema } from "mongoose";

export const DecksSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  title: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, maxLength: 200 },
}, { timestamps: true, toJSON: { virtuals: true } })

DecksSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})

DecksSchema.virtual("cardCount", {
  localField: "_id",
  ref: "Flashcard",
  foreignField: "deckId",
  count: true
})