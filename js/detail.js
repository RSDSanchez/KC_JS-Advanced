import api from './api.js';

const { getBeerById } = api();

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


const beerDetails = async(id) => {
    const beer = await getBeerById(id);
    console.log(beer);
}





export default beerDetails;