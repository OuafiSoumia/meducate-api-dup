// geojsonController.ts
import { Request, Response } from 'express';
import { geojsonService } from '@/services';

export const geojsonController = {

getAllCoordinates : async (req: Request, res: Response) => {
  try {
   
    const result = await geojsonService.getAllCoordinates();

    res.json(result);
  } catch (error) {
    console.error('Error in getAllCoordinates controller:', error);
    res.status(500).json({ error: 'Failed to fetch GeoJSON coordinates' });
  }},

};