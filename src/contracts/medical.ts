import { Model, ObjectId } from 'mongoose'


export interface IMedical {
  id: ObjectId
  name: string
  phone: string
  address: string,
  website: string,
  review_average: number,
  review_count: number,
  latitude:number,
  longutude:number,
  comments:string,
  sentiments:string,
  city:string,
  indiceRegion:number,
  category: ICategory[];
}

export interface ICategory {
  libelle: string;
  speciality: string;
}


export interface IMedicalMethods {
}
export type MedicalModel = Model<IMedical, unknown, IMedicalMethods>


