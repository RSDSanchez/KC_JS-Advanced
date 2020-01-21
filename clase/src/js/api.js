
const API_KEY = 'KEVIN_API_KEY';

const api = (apiURL = 'https://api.tvmaze.com') => {
  const searchAPIEndpoint = `${apiURL}/search/shows?q`;
  const showsAPIEndpoint = `${apiURL}/shows`;
  return {
    getShows: async text => {
      try {
        const URL = text ? `https://api.tvmaze.com/search/shows?q=${text}` : showsAPIEndpoint;
        const response = await fetch(URL, {
          method: 'GET',
          // headers: {
          //   'X-API-KEY': API_KEY,
          // },
        });
        if (!response.ok) {
          throw new Error('Error retrieving shows');
        }
        const data = await response.json();
        const shows = data.map(result => {
          if (result.show) {
            return result.show;
          }
          return result;
        });
        return shows;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    getShowDetail: id => {
      return fetch(`${showsAPIEndpoint}/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error retrieving show ${id}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        });
    },
    getQuotes: async id => {
      try {
        const response = await fetch(`${apiURL}/quote/${id}`);
        if (!response.ok) {
          throw new Error('Error getQuotes');
        }
        const quotes = await response.json();
        return quotes;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    createQuote: async (id, text) => {
      try {
        const response = await fetch(`${apiURL}/quote/${id}`, {
          method: 'POST',
          body: JSON.stringify({ quote: text }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Error createQuote');
        }
        const responseBody = await response.json();
        return responseBody;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;



