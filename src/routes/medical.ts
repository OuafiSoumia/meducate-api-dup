import { Router } from 'express'
import { medicalController } from '@/controllers'

export const medical = (router: Router): void => {
   
      /**
   * @swagger
   * /getMedicalDataByFilters/{city}/{category}/{speciality}:
   *   get:
   *     summary: get medicals
   *     description: get our filtred medicals data 
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: city
  *         in: path
  *         description: city of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: speciality
  *         in: path
  *         description: speciality of medical etablissement
  *         required: false
  *         schema:
  *           type: String
   *     responses:
   *       200:
   *         description: get medicals successfully
   */

      router.get('/getMedicalDataByFilters/:city/:category/:speciality',medicalController.getMedicalDataByFilters);

   /**
   * @swagger
   * /getMedicalDataCountsByCity:
   *   get:
   *     summary: get medicals
   *     description: get categories count by city
    *     tags:
   *       - medicals
   *     responses:
   *       200:
   *         description: get medicals successfully
   */

   router.get('/getMedicalDataCountsByCity',medicalController.getMedicalDataCountsByCity);  
   
   

      /**
   * @swagger
   * /getCategoryCountsByCity/{category}:
   *   get:
   *     summary: get medicals
   *     description: get our filtred medicals data 
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String

   *     responses:
   *       200:
   *         description: get medicals successfully
   */

      router.get('/getCategoryCountsByCity/:category',medicalController.getCategoryCountsByCity);

 /**
   * @swagger
   * /getMedicalDataCountByCategory:
   *   get:
   *     summary: Number of category 
    *     tags:
   *       - medicals
   *     responses:
   *       200:
   *         description: get successfully
   */
 router.get('/getMedicalDataCountByCategory', medicalController.getMedicalDataCountByCategory);
/**
   * @swagger
   * /getAllCities:
   *   get:
   *     summary: Number of category 
    *     tags:
   *       - medicals
   *     responses:
   *       200:
   *         description: get successfully
   */
router.get('/getAllCities', medicalController.getAllCities);
   
/**
   * @swagger
   * /getAllCategories:
   *   get:
   *     summary: Number of category 
    *     tags:
   *       - medicals
   *     responses:
   *       200:
   *         description: get successfully
   */
router.get('/getAllCategories', medicalController.getAllCategories);
   
      /**
   * @swagger
   * /getPositifCountByFilters/{city}/{category}/{speciality}:
   *   get:
   *     summary: get medicals
   *     description: get our filtred medicals data 
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: city
  *         in: path
  *         description: city of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: speciality
  *         in: path
  *         description: speciality of medical etablissement
  *         required: false
  *         schema:
  *           type: String
   *     responses:
   *       200:
   *         description: get medicals successfully
   */

      router.get('/getPositifCountByFilters/:city/:category/:speciality',medicalController.getPositifCountByFilters);
  /**
   * @swagger
   * /getNegatifCountByFilters/{city}/{category}/{speciality}:
   *   get:
   *     summary: get medicals
   *     description: get our filtred medicals data 
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: city
  *         in: path
  *         description: city of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String
  *       - name: speciality
  *         in: path
  *         description: speciality of medical etablissement
  *         required: false
  *         schema:
  *           type: String
   *     responses:
   *       200:
   *         description: get medicals successfully
   */

  router.get('/getNegatifCountByFilters/:city/:category/:speciality',medicalController.getNegatifCountByFilters);



  /**
   * @swagger
   * 
   * /getAveragePositiveScoreByCategory/{category}:
   *   get:
   *     summary: get medicals
   *     description: get our filtred medicals data 
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String
   *     responses:
   *       200:
   *         description: get  successfully
   */


  router.get('/getAveragePositiveScoreByCategory/:category', medicalController.getAveragePositiveScoreByCategory);

  /**
   * @swagger
   * /getCategoryCountsByRegion/{category}:
   *   get:
   *     summary: get medicals
   *     description: get Category Counts ByRegion
    *     tags:
   *       - medicals
  *     parameters:
  *       - name: category
  *         in: path
  *         description: category of medical etablissement
  *         required: false
  *         schema:
  *           type: String
   *     responses:
   *       200:
   *         description: get  successfully
   */

router.get('/getCategoryCountsByRegion/:category', medicalController.getCategoryCountsByRegion);
   

  };
  