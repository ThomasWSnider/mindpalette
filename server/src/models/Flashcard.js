import { Schema } from "mongoose";

export const FlashcardsSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  title: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, maxLength: 200 },
  deckId: { type: Schema.ObjectId, required: true, ref: "Deck" }
}, { timestamps: true, toJSON: { virtuals: true } })

FlashcardsSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id"
})

