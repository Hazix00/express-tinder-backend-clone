import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface TinderCard {
  name: string;
  image: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<TinderCard>({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

// 3. Create a Model.
export const TinderCardModel = model<TinderCard>('TinderCard', schema);