import { Router } from 'express'
import { geojsonController } from '@/controllers'

export const geojson= (router: Router): void => {


   /**
   * @swagger
   * /getRegionsData:
   *   get:
   *     summary: get regions
   *     description: get regions coordinates,name..
    *     tags:
   *       - geojsons
   *     responses:
   *       200:
   *         description: get regions successfully
   */

   router.get('/getRegionsData',geojsonController.getAllCoordinates); 



};