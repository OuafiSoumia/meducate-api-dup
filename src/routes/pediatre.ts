import { Router } from 'express'
import { pediatreController } from '@/controllers'

export const pediatre = (router: Router): void => {
     /**
   * @swagger
   * /pediatres:
   *   get:
   *     summary: get pediatricians
   *     description: get all our pediatrician data 
    *     tags:
   *       - Pediatricians
   *     responses:
   *       200:
   *         description: get Pediatricians successfully
   */

    router.get('/pediatres',pediatreController.getPediatrician);

/**
 * @swagger
 * /pediatre/{id}:
 *   get:
 *     summary: get pediatrician
 *     description: get  pediatrician By ID 
 *     tags:
 *       - Pediatricians
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of pediatrician
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get Pediatrician successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Unauthorized
 */
router.get('/pediatre/:id', pediatreController.getPediatricianById);

 /**
   * @swagger
   * /pediatres/countByCity:
   *   get:
   *     summary: Number of pediatricians By City
    *     tags:
   *       - Pediatricians
   *     responses:
   *       200:
   *         description: get successfully
   */
router.get('/pediatres/countByCity', pediatreController.getPediatriciansCountByCity);
     /**
   * @swagger
   * /NumberOfpediatre:
   *   get:
   *     summary: get pediatricians
   *     description: get all our pediatrician data 
    *     tags:
   *       - Pediatricians
   *     responses:
   *       200:
   *         description: get Pediatricians successfully
   */
     router.get('/NumberOfpediatre', pediatreController.getNumberOfAllPediatrians);

/**
 * @swagger
 * /NumberOfpediatreByCity/{city}:
 *   get:
 *     summary: get pediatrician
 *     description: get  pediatrician By City 
 *     tags:
 *       - Pediatricians
 *     parameters:
 *       - name: city
 *         in: path
 *         description: city of pediatrician
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get Pediatrician successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Unauthorized
 */
router.get('/NumberOfpediatreByCity/:city', pediatreController.getNumberOfPediatriansByCity);

/**
 * @swagger
 * /commentsNegativeCountByCity/{city}:
 *   get:
 *     summary: get pediatrician
 *     description: get  comments By City 
 *     tags:
 *       - Pediatricians
 *     parameters:
 *       - name: city
 *         in: path
 *         description: city of pediatrician
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get Pediatrician successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Unauthorized
 */
router.get('/commentsNegativeCountByCity/:city', pediatreController.getCommentsNegativeCountByCity);
/**
 * @swagger
 * /commentsPositiveCountByCity/{city}:
 *   get:
 *     summary: get pediatrician
 *     description: get  comments By City 
 *     tags:
 *       - Pediatricians
 *     parameters:
 *       - name: city
 *         in: path
 *         description: city of pediatrician
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get Pediatrician successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Unauthorized
 */
router.get('/commentsPositiveCountByCity/:city', pediatreController.getCommentsPositiveCountByCity);
 /**
   * @swagger
   * /pediatres/getAveragePositiveScoreByCity:
   *   get:
   *     summary: average of Positive coments By City
    *     tags:
   *       - Pediatricians
   *     responses:
   *       200:
   *         description: get  successfully
   */


 router.get('/pediatres/getAveragePositiveScoreByCity', pediatreController.getAveragePositiveScoreByCity);

  };
  