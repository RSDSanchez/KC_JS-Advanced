const BEER_API_URL = 'https://beerflix-api.herokuapp.com/api/v1';
const API_KEY = 'KK6QDEA-MS342DY-PQZQ23K-RQBMJ1R';

const api = (apiURL = BEER_API_URL, limit = 6) => {
   const beersEndPoint = `${apiURL}/beers?limit=${limit}`;
   return {
      getBeers: async () => {
         try {
            const URL = `${beersEndPoint}`;
            const res = await fetch(URL, {
               headers: {
                  'Content-Type': 'application/json',
                  'X-API-KEY': API_KEY
               }
            });
            if (!res.ok) {
               throw new Error(
                  'No se puede conectar a la API o la API no responde'
               );
            }
            const data = await res.json();
            return data.beers;
         } catch (err) {
            console.log(err.message);
            throw err;
         }
      },
      getBeerById: async id => {
         try {
            const URL = `${beersEndPoint}/${id}`;
            const res = await fetch(URL, {
               headers: {
                  'Content-Type': 'application/json',
                  'X-API-KEY': API_KEY
               }
            });
            if (!res.ok) {
               throw new Error(
                  'No se puede conectar a la API o la API no responde'
               );
            }
            const data = await res.json();
            return data.beer;
         } catch (err) {
            console.log(err.message);
            throw err;
         }
      }
   };
};

export default api;
