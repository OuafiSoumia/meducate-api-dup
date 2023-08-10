import { Schema, model } from 'mongoose'

import { IPediatre, PediatreModel } from '@/contracts/pediatre'
const sentimentsType = {
  label: String,
  score: Number,
};

const schema = new Schema({
  name: String,
  address: String,
  website: String,
  phone_number: String,
  reviews_count: Number,
  reviews_average: Number,
  latitude: Number,
  longitude: Number,
  comments: String,
  sentiments: typeof sentimentsType,
  city: String,
});


export const Pediatre = model('Pediatre', schema);