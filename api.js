const URL = 'https://beerflix-api.herokuapp.com/api/v1';
const API_KEY = 'KK6QDEA-MS342DY-PQZQ23K-RQBMJ1R';

fetch(URL + '/beers', {
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        return res.json();

    }).then(res => console.log(res.beers))
    .catch(error => console.log('ERROR: ', error));