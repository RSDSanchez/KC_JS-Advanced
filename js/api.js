const API_URL = 'https://beerflix-api.herokuapp.com/api/v1';
const API_KEY = 'KK6QDEA-MS342DY-PQZQ23K-RQBMJ1R';

const api = (apiURL = API_URL) => {
    const beersEndPoint = `${apiURL}/beers`;
    return {
        getBeers: async keyword => {
            try {
                const URL = keyword ? `${beersEndPoint}?search=${keyword}` : `${beersEndPoint}?limit=10`;
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
        },
        getComments: async id => {
            try {
                const response = await fetch(`${apiURL}/quote/${id}`);
                if (!response.ok) {
                    throw new Error('Error leyendo comentarios');
                }
                const comments = await response.json();
                return comments;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        createComment: async(id, comment) => {
            try {
                const response = await fetch(`${apiURL}/quote/${id}`, {
                    method: 'POST',
                    body: JSON.stringify({ quote: comment }),
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error creando comentario');
                }
                // const responseBody = await response.json();
                // return responseBody;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    };
};


export default api;