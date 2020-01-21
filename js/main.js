import api from './api.js';

const { getBeers } = api();

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
               <a href="movie.html">
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

const showBeers = async () => {
   const beers = await getBeers();
   const sectionContainer = document.querySelector('.section-container');
   console.log(beers);
   const beersHTML = beers
      .map((beer, index) => {
         return beerTemplate(beer, index);
      })
      .join('');
   sectionContainer.innerHTML = beersHTML;
};

showBeers();
