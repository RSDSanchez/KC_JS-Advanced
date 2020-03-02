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
const resetButton = document.getElementById('reset-forms');
const logoButton = document.querySelector('.navbar > .logo a');

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

const noBeerTemplate = `
   <article class="item">
      <div class="description">
         <div class="details">
            <div class="summary">
                  <h3>No results</h3>
            </div>
         </div>
      </div>
   </article>
   `;

const printBeers = (beers) => {
  const sectionContainer = document.getElementById('main-section');
  sectionContainer.classList.add('section-container');
  sectionContainer.classList.remove('section-detail');
  if (beers.length > 0) {
    const beersHTML = beers
      .slice(0, 6)
      .map((beer, index) => {
        return beerTemplate(beer, index);
      })
      .join('');
    sectionContainer.innerHTML = beersHTML;
  } else {
    sectionContainer.innerHTML = noBeerTemplate;
  }
  hide(document.querySelector('.comment-section'));
};

const beersData = async (keyword) => {
  const beers = await getBeers(keyword);
  printBeers(beers);
};

const filterByDate = async (date) => {
  const beers = await getBeers();
  const filteredBeers = beers.filter((beer) => beer.firstBrewed === date);
  printBeers(filteredBeers);
};

logoButton.addEventListener('click', () => {
  location.href = '/';
});

searchButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!searchField.value) {
    hide(dateField);
    show(searchField);
  } else {
    beersData(searchField.value);
    setItem('search-filter', searchField.value);
    searchField.value = '';
    hide(searchField);
  }
});

dateButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!dateField.value) {
    hide(searchField);
    show(dateField);
  } else {
    let date = dateField.value;
    date = date
      .split('-', 2)
      .reverse()
      .join('/');
    filterByDate(date);
    setItem('date-filter', date);
    dateField.value = '';
    hide(dateField);
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  localStorage.clear();
  searchField.value = '';
  hide(searchField);
  dateField.value = '';
  hide(dateField);
  beersData();
});

const loadSectionContainer = () => {
  if (getItem('search-filter')) {
    beersData(getItem('search-filter'));
  } else if (getItem('date-filter')) {
    filterByDate(getItem('date-filter'));
  } else {
    beersData();
  }
};

export default loadSectionContainer;
