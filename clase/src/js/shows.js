import api from './api.js';
import { renderLoader } from './ui.js';

const { getShows } = api();

const templateShow = show => {
   return `
    <a href="/detail/${show.id}">
      <div class="card ${show.principal ? 'principal' : 'secondary close'}">
        <header class="card-header">
          <h2>${show.name}</h2>
        </header>
        <div class="card-content">
          <div class="card-content-image">
            <img src="${
               show.image ? show.image.medium : '/src/images/default.jpg'
            }">
          </div>
          <div class="card-content-text">
            <p>${show.summary}
            </p>
            <div class="rating-container">
              <button class="icon">
                <i class="fas fa-star"></i>
              </button>
              <button class="icon">
                <i class="far fa-star"></i>
              </button>
              <button class="icon">
                <i class="far fa-star"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
};

export const renderShows = (element, items) => {
   const htmlShows = items
      .slice(0, 6)
      .map(function(show, index) {
         if (index < 2) {
            return templateShow({ ...show, principal: true });
         }
         return templateShow({ ...show, principal: false });
      })
      .join(''); // [1, 2] -> '12'
   element.innerHTML = `
    <div class="show-section">
      ${htmlShows}
    </div>
  `;
   const cardHeaders = document.querySelectorAll('.card .card-header');

   cardHeaders.forEach((header, index) => {
      const card = header.parentNode;
      header.addEventListener('click', evt => {
         evt.preventDefault();
         card.classList.toggle('close');
      });
   });
};

const renderHomeShows = async text => {
   try {
      renderLoader('hide', 'show');
      const shows = await getShows(text);
      const mainSection = document.querySelector('main');
      renderShows(mainSection, shows);
   } catch (err) {
      console.log(err);
      // Manejador de error a nivel UI
   } finally {
      renderLoader('show', 'hide');
   }
};

export default renderHomeShows;
