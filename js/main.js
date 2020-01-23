import api from './api.js';
import { hide, show } from './global.js';
import storage from './storage.js';

// export let INPUT_STORAGE_ID = '';
export const STORAGE_TYPE = 'lStorage';

const { setItem, getItem } = storage(STORAGE_TYPE);

const { getBeers } = api();
const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('searcher');
const dateButton = document.getElementById('date-button');
const dateField = document.getElementById('date-field');

const beerTemplate = (beer, index) => {
    return `
   <article class="item item${index + 1}">
      <div class="description">
         <div class="info">
               <div class="left">Brewed: ${beer.firstBrewed}</div>
               <div class="right">Price: ${beer.price}$</div>
         </div>
         <div class="details">
            <div class="image">
               <img src="${beer.image}" alt="Película Avengers"/>
            </div>
            <div class="summary">
               <a href="/detail/${beer.beerId}">
                  <h3>${beer.name}</h3>
                  <p>
                     ${beer.description}
                  </p>
               </a>
            </div>
         </div>
      </div>
   </article>
   `;
};

const printBeers = beers => {
    const sectionContainer = document.querySelector('.section-container');
    const beersHTML = beers
        .slice(0, 6)
        .map((beer, index) => {
            return beerTemplate(beer, index);
        })
        .join('');
    sectionContainer.innerHTML = beersHTML;
};

const showBeers = async keyword => {
    const beers = await getBeers(keyword);
    console.log(beers);
    printBeers(beers);
};

const filterByDate = async date => {
    const beers = await getBeers();
    const filteredBeers = beers.filter(beer => beer.firstBrewed === date);
    console.log(filteredBeers);
    printBeers(filteredBeers);

};

searchButton.addEventListener('click', evt => {
    evt.preventDefault();
    if (!searchField.value) {
        hide(dateField);
        show(searchField);
    } else {
        showBeers(searchField.value);
        setItem('search-filter', searchField.value)
        searchField.value = '';
        hide(searchField);
    }
});

dateButton.addEventListener('click', evt => {
    evt.preventDefault();
    if (!dateField.value) {
        hide(searchField);
        show(dateField);
    } else {
        let date = dateField.value
        date = date.split('-', 2).reverse().join('/');
        filterByDate(date);
        setItem('date-filter', date)
        dateField.value = '';
        hide(dateField);
    }
});

const loadSectionContainer = () => {
    if (getItem('search-filter')) {
        showBeers(getItem('search-filter'));
    } else if (getItem('date-filter')) {
        filterByDate(getItem('date-filter'));
    } else {
        showBeers();
    }
}


export default loadSectionContainer;

// const beerDetails = async(id) => {
//     const beer = await getBeerById(id);
//     console.log(beer);
// }

// beerDetails(18);