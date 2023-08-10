import { Geojson } from '@/models';

export const geojsonService = {
  getAllCoordinates: async () => {
    try {
      const pipeline = [
        {
          $project: {
            features: 1,
            _id: 0,
          },
        },
        {
          $unwind: '$features',
        },
        {
          $match: {
            'features.geometry.coordinates': { $exists: true, $ne: [] },
          },
        },
        {
          $group: {
            _id: null,
            coordinatesArray: { $push: '$features.geometry.coordinates' },
          },
        },
        {
          $project: {
            _id: 0,
            first100Coordinates: { $slice: ['$coordinatesArray', 100] },
          },
        },
      ];

      const result = await Geojson.aggregate(pipeline);

      if (result.length > 0) {
        return result[0].first100Coordinates;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error during getFirst100Coordinates:', error);
      throw new Error('Failed to fetch the first 100 GeoJSON coordinates');
    }
  },
};