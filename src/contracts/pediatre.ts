import { Double } from 'mongodb'
import { Model, ObjectId } from 'mongoose'



export interface IPediatre {
  id: ObjectId
  name: string
  phone: string
  phone_number:string,
  address: string,
  website: string,
  review_average: number,
  review_count: number,
  latitude:number,
  longutude:number,
  comments:string,
  sentiments:sentimentsType,
  city:string
    
}
interface sentimentsType {
  label: string;
  score: number;
}


export type PediatreModel = Model<IPediatre>
