import { ObjectId } from 'mongoose';
import { Medical } from '@/models';
import { ICategory } from '@/contracts/medical';



interface MedicalFilters {

   city?: String,
  'category.libelle'?: String,
  'category.speciality'?: String
}
interface CategoryCountsByCity {
  [city: string]: number;
}
  
const countSentimentsByType = async (city: string, category: string, speciality: string, sentimentType: string) => {
  try {
    const isAllParameters = !city && !category && !speciality;
    
    if (isAllParameters) {
      const allMedicalData = await Medical.find();
      const sentimentCount = allMedicalData.reduce((count, medical) => {
        return count + (medical.sentiments === sentimentType ? 1 : 0);
      }, 0);
      return sentimentCount;
    }

    const filters: MedicalFilters = {};

    if (city && city !== 'All') {
      filters.city = city;
    }

    if (category && category !== 'All') {
      filters['category.libelle'] = category;
    }

    if (speciality && speciality !== 'All') {
      filters['category.speciality'] = speciality;
    }

    const medicalData = await Medical.find(filters);
    const sentimentCount = medicalData.reduce((count, medical) => {
      console.log('Medical Sentiment:', medical.sentiments);
      console.log('Medical type:', sentimentType);
      return count + (medical.sentiments === sentimentType ? 1 : 0);
    }, 0);
    console.log('Final Sentiment Count:', sentimentCount);
    return sentimentCount;
    
  } catch (error) {
    console.error('Erreur lors du traitement des données médicales :', error);
    throw new Error('Erreur lors du traitement des données médicales');
  }
};

export const medicalService = {

    getMedicalDataByFilters:
    async (city: string, category: string, speciality: string) => {
      try {
        // Check if all parameters are "All" or empty
        const isAllParameters = !city && !category && !speciality;
        
        // If all parameters are "All" or empty, return all the data
        if (isAllParameters) {
          const allMedicalData = await Medical.find();
          return allMedicalData;
        }
  
        // Créer un objet vide pour stocker les filtres de recherche
        const filters: MedicalFilters = {};
  
        // Vérifier si le paramètre city est fourni et différent de "All"
        if (city && city !== "All") {
          // Ajouter le filtre pour la ville
          filters.city = city;
        }
  
        // Vérifier si le paramètre category est fourni et différent de "All"
        if (category && category !== "All") {
          // Ajouter le filtre pour la catégorie
          filters["category.libelle"] = category;
        }
  
        // Vérifier si le paramètre speciality est fourni et différent de "All"
        if (speciality && speciality !== "All") {
          // Ajouter le filtre pour la spécialité
          filters["category.speciality"] = speciality;
        }
  
        console.log(filters);
  
        // Effectuer la recherche dans la base de données avec les filtres appliqués
        const medicalData = await Medical.find(filters);
        return medicalData;
      } catch (error) {
        console.error("Erreur lors de la récupération des données médicales :", error);
        throw new Error("Erreur lors de la récupération des données médicales");
      }
    },
  
    getMedicalDataCountsByCity: async () => {
      try {
        // Fetch all medical data
        const allMedicalData = await Medical.find();
    
        // Retrieve the list of unique categories from the medical data
        const allCategories = Array.from(
          new Set(allMedicalData.flatMap((medical) => medical.category.map((category) => category.libelle)))
        );
    
        // Retrieve all the cities from the medical data
        const allCities = Array.from(new Set(allMedicalData.map((medical) => medical.city)));
    
        // Create an object to store the counts of each category for all cities
        const cityCategoryCounts: { [city: string]: { [category: string]: number } } = {};
    
        // Initialize the counts of all categories to 0 for each city
        allCities.forEach((city) => {
          cityCategoryCounts[city] = {};
          allCategories.forEach((category) => {
            cityCategoryCounts[city][category] = 0;
          });
        });
    
        // Loop through all medical data and count the occurrences of each category for each city
        allMedicalData.forEach((medical) => {
          const city = medical.city;
          medical.category.forEach((category) => {
            const categoryLabel = category.libelle;
            cityCategoryCounts[city][categoryLabel]++;
          });
        });
    
        return cityCategoryCounts;
      } catch (error) {
        console.error("Error while fetching medical data:", error);
        throw new Error("Error while fetching medical data");
      }
    },
  
    getCategoryCountsByCity: async (category: ICategory['libelle']) => {
      try {
        // Récupérer toutes les données médicales pour la catégorie spécifiée
        const medicalDataForCategory = await Medical.find({
          'category.libelle': category,
        });
  
        // Créer un objet pour stocker les comptages de catégorie par ville
        const categoryCountsByCity: CategoryCountsByCity = {};
  
        // Compter les occurrences de la catégorie pour chaque ville
        medicalDataForCategory.forEach((medical) => {
          const city = medical.city;
          if (city) {
            if (categoryCountsByCity[city]) {
              categoryCountsByCity[city]++;
            } else {
              categoryCountsByCity[city] = 1;
            }
          }
        });
  
        return categoryCountsByCity;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error('Erreur serveur');
      }
    },
    getMedicalDataCountByCategory : async () => {
      try {
          const categoryCounts = await Medical.aggregate([
              {
                  $unwind: '$category', // Si category est un tableau, décomposez-le
              },
              {
                  $group: {
                      _id: '$category.libelle', // Utilisation du libelle de la catégorie pour le regroupement
                      count: { $sum: 1 },
                  },
              },
              {
                  $sort: {
                      count: -1,
                  },
              },
          ]);
  
          // Ajoutez le code ici pour manipuler les résultats comme nécessaire
          return categoryCounts;
      } catch (error) {
          console.error('Error while fetching medical data counts by category:', error);
          throw new Error('Failed to fetch medical data counts by category');
      }
  },  
  
    averagePositiveScoreByCategory: async (category: string) => {
      try {
        const medicals = await Medical.find({
          'category.libelle': category,
        });
    
        console.log('Found medicals:', medicals);
    
        let cityScores: { [city: string]: { positives: number; totalCount: number } } = {};
    
        for (const medical of medicals) {
          if (medical.city && typeof medical.sentiments === 'string') {
            const sentiments: string = medical.sentiments;
    
            // Check if the sentiment is 'POSITIVE' (assuming it is case-sensitive)
            if (sentiments === 'POSITIVE') {
              const city: string = medical.city;
              if (!cityScores[city]) {
                cityScores[city] = { positives: 0, totalCount: 0 };
              }
    
              cityScores[city].positives++;
              cityScores[city].totalCount++;
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
        console.error('Error while calculating average positive score by category:', error);
        throw new Error('Error while calculating average positive score by category');
      }
    },
    
    getAllCities: () =>    Medical.distinct('city'),
    getAllCategories: () =>    Medical.distinct('category'),

    getPositifCountByFilters : async (city: string, category: string, speciality: string) => {
      return countSentimentsByType(city, category, speciality, "POSITIVE");
    },

    getNegatifCountByFilters : async (city: string, category: string, speciality: string) => {
      return countSentimentsByType(city, category, speciality, "NEGATIVE");
    },

    getCategoryCountsByRegion: async (category: string) => {
      try {
        const regionCategoryCounts: { [regionIndex: number]: number } = {};
    
        // Retrieve all medical data
        const allMedicalData = await Medical.find();
    
        // Loop through all medical data and count the occurrences of the specified category for each region
        allMedicalData.forEach((medical) => {
          const regionIndex = medical.indiceRegion;
    
          // Check if the medical entry has the specified category
          const hasCategory = medical.category.some((cat) => cat.libelle === category);
    
          if (hasCategory) {
            if (!regionCategoryCounts[regionIndex]) {
              regionCategoryCounts[regionIndex] = 1;
            } else {
              regionCategoryCounts[regionIndex]++;
            }
          }
        });
    
        return regionCategoryCounts;
      } catch (error) {
        console.error('Error while fetching category counts by region:', error);
        throw new Error('Error while fetching category counts by region');
      }
    },


};