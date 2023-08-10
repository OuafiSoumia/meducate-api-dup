import { model, Schema, Document } from 'mongoose';

// Interface pour les données de la géométrie
interface Geometry {
  type: string;
  coordinates: number[][][];
}

// Interface pour les propriétés des entités géographiques
interface Properties {
  nom_region: string;
  Indice: number;
  Population: number;
  // Autres propriétés ici
}

// Interface pour une entité géographique (Feature)
interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

// Interface pour le document GeoJSON
interface IGeojsonDocument extends Document {
  _id: string;
  type: string;
  name: string;
  crs: object;
  features: Feature[];
}

// Schéma Mongoose
const geojsonSchema = new Schema<IGeojsonDocument>({
  _id: String,
  type: String,
  name: String,
  crs: Object,
  features: [{
    type: String,
    properties: {
      nom_region: String,
      Indice: Number,
      Population: Number,
    },
    geometry: {
      type: String,
      coordinates: [[[Number]]],
    },
  }],
});

// Modèle Mongoose
export const Geojson = model<IGeojsonDocument>('Geojson', geojsonSchema);

