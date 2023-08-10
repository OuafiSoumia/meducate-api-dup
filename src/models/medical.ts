import { Schema, model } from 'mongoose'
import { IMedical, MedicalModel } from '@/contracts/medical'

const ICategory= {
  libelle: String,
  speciality: String,
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
  comments: Array,
  sentiments: String,
  city: String,
  indiceRegion:Number,
  category: [{ type: ICategory }]
});

export const Medical = model<IMedical, MedicalModel>('Medical', schema)


