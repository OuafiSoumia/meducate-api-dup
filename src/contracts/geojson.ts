import { Model, Document } from 'mongoose';

  // Interface pour un document Geojson
  export interface IGeojsonDocument extends Document {
    _id: string;
    type: string;
    name: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    features: {
      type: string;
      properties: {
        nom_region: string;
        Indice: number;
        Population: number;
      };
      geometry: {
        type: string;
        coordinates: number[][][];
      };
    }[];
  }
  

export type GeojsonModel = Model<IGeojsonDocument>;