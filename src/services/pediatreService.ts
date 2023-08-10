import { ClientSession, ObjectId } from 'mongoose';
import { Pediatre } from '@/models';
import { PediatreModel } from '@/contracts/pediatre';

interface Sentiments {
  label: string;
  score: number;
}

export const pediatreService = {
  getById: (pediatreId: ObjectId) => Pediatre.findById(pediatreId),

  getPediatriciansCountByCity: () =>
    Pediatre.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]),

  numberOfAllPediatrians: async () => {
    try {
      const numberOfPediatres = await Pediatre.countDocuments();
      return numberOfPediatres;
    } catch (error) {
      console.error('Erreur lors du calcul du nombre de pédiatres :', error);
      throw new Error('Erreur lors du calcul du nombre de pédiatres');
    }
  },

  getReviewsCountByCity: () =>
    Pediatre.aggregate([
      {
        $group: {
          _id: '$city',
          totalReviews: { $sum: '$reviews_count' },
        },
      },
      {
        $sort: {
          totalReviews: -1,
        },
      },
    ]),

  numberOfPediatriansByCity: async (city: string) => {
    try {
      const numberOfPediatres = await Pediatre.countDocuments({ city });
      return numberOfPediatres;
    } catch (error) {
      console.error('Erreur lors du calcul du nombre de pédiatres :', error);
      throw new Error('Erreur lors du calcul du nombre de pédiatres');
    }
  },

  commentsPositiveCountByCity:async (city: string) => {
  try {
    const pediatresByCity = await Pediatre.find({ city });
    let positiveSentiments = 0;

    for (const pediatre of pediatresByCity) {
      if (Array.isArray(pediatre.sentiments)) {
        const positiveSentimentsCount = pediatre.sentiments.filter((sentiment) => sentiment.label === 'POSITIVE').length;
        positiveSentiments += positiveSentimentsCount;
      }
    }

    return positiveSentiments;
  } catch (error) {
    console.error('Erreur lors du calcul du nombre de commentaires positifs :', error);
    throw new Error('Erreur lors du calcul du nombre de commentaires positifs');
  }
},

  
  
  commentsNegativeCountByCity: async (city: string) => {
    try {
      const pediatresByCity = await Pediatre.find({ city });
      let negativeSentiments = 0;
  
     for (const pediatre of pediatresByCity) {
      if (Array.isArray(pediatre.sentiments)) {
        const positiveSentimentsCount = pediatre.sentiments.filter((sentiment) => sentiment.label === 'NEGATIVE').length;
        negativeSentiments += positiveSentimentsCount;
      }
    }
  
      return negativeSentiments;
    } catch (error) {
      console.error('Erreur lors du calcul du nombre de commentaires positifs :', error);
      throw new Error('Erreur lors du calcul du nombre de commentaires positifs');
    }
  },
  
 
  averagePositiveScoreByCity: async () => {
    try {
      const pediatres = await Pediatre.find();
  
      let cityScores: { [city: string]: { positives: number; totalCount: number } } = {};
  
      for (const pediatre of pediatres) {
        if (pediatre.city) {
          if (Array.isArray(pediatre.sentiments)) {
            for (const sentiment of pediatre.sentiments) {
              const city: string = pediatre.city;
              if (!cityScores[city]) {
                cityScores[city] = { positives: 0, totalCount: 0 };
              }
  
              if (sentiment.label === 'POSITIVE') {
                cityScores[city].positives++;
              }
              cityScores[city].totalCount++;
            }
          }
        }
      }
  
      const averagePositiveScores = Object.entries(cityScores).map(([city, scores]) => {
        const positiveCount = scores.positives;
        const totalCount = scores.totalCount;
        const averageScore = positiveCount / totalCount;
        return { city, averageScore };
      });
  
      // Sort the cities based on their average positive scores in descending order
      averagePositiveScores.sort((a, b) => b.averageScore - a.averageScore);
  
      return averagePositiveScores;
    } catch (error) {
      console.error('Error while calculating average positive score by city:', error);
      throw new Error('Error while calculating average positive score by city');
    }
  },
  
  


};