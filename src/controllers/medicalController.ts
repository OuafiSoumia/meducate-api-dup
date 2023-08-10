import { Response } from 'express';
import { Request } from 'express';
import { Medical } from '@/models';
import { StatusCodes } from 'http-status-codes';
const { ObjectID } = require("bson");
import {medicalService} from '@/services'



export const medicalController = {

  getMedicalDataByFilters: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getMedicalDataByFilters(req.params.city, req.params.category, req.params.speciality);

      res.json( medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données médicales par filtres :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  },

  getMedicalDataCountsByCity: async (req: Request, res: Response) => {

  try {
    const medicalData = await medicalService.getMedicalDataCountsByCity();

    res.json(medicalData);
  }catch (error) {
      console.error('Erreur lors de la récupération :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:errorMessage });
    }

  },


  getCategoryCountsByCity: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getCategoryCountsByCity(req.params.category);

      res.json( medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données médicales par filtres :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  },
  getMedicalDataCountByCategory: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getMedicalDataCountByCategory();
      res.json(medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération de la somme de reviews par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  getAllCities: async (req: Request, res: Response) => {
    try {
      const medicalData =await  medicalService.getAllCities();
      console.log('****',res);
      res.json(medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération de la somme de reviews par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const medicalData =await  medicalService.getAllCategories();
      console.log('****',res);
      res.json(medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération de la somme de reviews par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  getPositifCountByFilters: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getPositifCountByFilters(req.params.city, req.params.category, req.params.speciality);
      res.json( medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données médicales par filtres :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  },
  getNegatifCountByFilters: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getNegatifCountByFilters(req.params.city, req.params.category, req.params.speciality);
      res.json( medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données médicales par filtres :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  },

  getAveragePositiveScoreByCategory: async (req: Request, res: Response) => {
    try {
      const averageScores = await medicalService.averagePositiveScoreByCategory(req.params.category);
      res.json(averageScores);
    } catch (error) {
      console.error('Error in getAveragePositiveScoreByCity controller:', error);
      res.status(500).json({ error: 'An error occurred while fetching average positive scores by city.' });
    }
  },


  getCategoryCountsByRegion: async (req: Request, res: Response) => {
    try {
      const medicalData = await medicalService.getCategoryCountsByRegion(req.params.category);
      res.json(medicalData);
    } catch (error) {
      console.error('Erreur lors de la récupération', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },

};
