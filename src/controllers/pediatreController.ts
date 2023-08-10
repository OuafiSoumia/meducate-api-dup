import { Response } from 'express';
import { Request } from 'express';
import { Pediatre } from '@/models';
import { StatusCodes } from 'http-status-codes';
const { ObjectID } = require("bson");
import {pediatreService} from '@/services'


export const pediatreController = {
  getPediatrician: async (req: Request, res: Response) => {
    try {
      const pediatres = await Pediatre.find();
      res.json(pediatres);
    } catch (error) {
      console.error('Erreur lors de la récupération des pédiatres :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },

  
  getPediatricianById: async (req: Request, res: Response) => {
    //pour tester la valeur de id
  //  const errorMessage = ' mon id est '+req.params.id;
    try {
      let id = req.params.id;
      const pediatre = await Pediatre.findById(id);
      res.json(pediatre);
    } catch (error) {
      console.error('Erreur lors de la récupération du pédiatre :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:errorMessage });
    }
  },

  
  getNumberOfAllPediatrians: async (req: Request, res: Response) => {
    //pour tester la valeur de id
  //  const errorMessage = ' mon id est '+req.params.id;
  try {
    let numberOfAllPediatrians =
    await pediatreService.numberOfAllPediatrians();
    res.json({
      numberOfPediatres: numberOfAllPediatrians,
    });
  }catch (error) {
      console.error('Erreur lors de la récupération du pédiatre :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:errorMessage });
    }

  },


  getNumberOfPediatriansByCity: async (req: Request, res: Response) => {
    //pour tester la valeur de id
  //  const errorMessage = ' mon id est '+req.params.id;
  try {
    let numberOfPediatriansByCity =
    await pediatreService.numberOfPediatriansByCity(req.params.city);
    res.json({
      numberOfPediatres: numberOfPediatriansByCity,
    });
  }catch (error) {
      console.error('Erreur lors de la récupération du pédiatre :', error);
      const errorMessage = 'Erreur serveur';
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:errorMessage });
    }

  },


  getPediatriciansCountByCity: async (req: Request, res: Response) => {
    try {
      const pediatriciansCountByCity = await pediatreService.getPediatriciansCountByCity();
      res.json(pediatriciansCountByCity);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de pédiatres par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  
  getCommentsCountByCity: async (req: Request, res: Response) => {
    try {
      const commentsCountByCity = await pediatreService.commentsPositiveCountByCity(req.params.city);
      res.json(commentsCountByCity);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de pédiatres par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  getCommentsNegativeCountByCity: async (req: Request, res: Response) => {
    try {
      const commentsNegativeCountByCity = await pediatreService.commentsNegativeCountByCity(req.params.city);
      res.json(commentsNegativeCountByCity);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de pédiatres par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },
  getCommentsPositiveCountByCity: async (req: Request, res: Response) => {
    try {
      const commentsPositiveCountByCity = await pediatreService.commentsPositiveCountByCity(req.params.city);
      res.json(commentsPositiveCountByCity);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de pédiatres par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },


  getReviewsCountByCity: async (req: Request, res: Response) => {
    try {
      const reviewsCountByCity = await pediatreService.getReviewsCountByCity();
      res.json(reviewsCountByCity);
    } catch (error) {
      console.error('Erreur lors de la récupération de la somme de reviews par ville :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
    }
  },

  getAveragePositiveScoreByCity: async (req: Request, res: Response) => {
    try {
      const averageScores = await pediatreService.averagePositiveScoreByCity();
      res.json(averageScores);
    } catch (error) {
      console.error('Error in getAveragePositiveScoreByCity controller:', error);
      res.status(500).json({ error: 'An error occurred while fetching average positive scores by city.' });
    }
  },

};