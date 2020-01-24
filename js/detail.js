import api from './api.js';
import { hide, show } from './global.js';

const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { getBeerById } = api();
const { getComments, createComment } = api(QUOTES_API);

const detailTemplate = beer => {
   return `
    <div class="beer-detail">
        <h1 class="title">${beer.name}</h1>

        <div class="image">
            <img src="${beer.image}" alt="${beer.name}"/>
        </div>

        <div class="data">
            <h3>Beer Data</h3>
            <ul>
                <li>Price: ${beer.price}$</li>
                <li>First Brewed: ${beer.firstBrewed}</li>
                <li>Contribute: ${beer.contributedBy}</li>
            </ul>
        </div>
        <div class="tips">
            <h3>Brewer's Tips</h3>
            <p>${beer.brewersTips}</p>
        </div>
        <div class="description">
        <h3>Description</h3>
            <p>${beer.description}</p>
        </div>
    </div>
   `;
};

const commentTemplate = comment => {
   return `<div>${comment.quote} - ${comment.date}</div>`;
};

const printBeer = beer => {
   const sectionContainer = document.getElementById('main-section');
   sectionContainer.classList.remove('section-container');
   sectionContainer.classList.add('section-detail');
   const beerHTML = detailTemplate(beer);
   sectionContainer.innerHTML = beerHTML;
};

const printComments = comments => {
   console.log(comments);
   const commentList = document.getElementById('comment-list');
   comments.forEach(comment => {
      console.log(comment.quote);
      const commentHTML = commentTemplate(comment);
      commentList.innerHTML += commentHTML;
   });
};

const beerDetails = async id => {
   const beer = await getBeerById(id);
   const comments = await getComments(id);
   printBeer(beer);
   printComments(comments);
   hide(document.querySelector('.date-filter'));
   hide(document.querySelector('.search-filter'));
   hide(document.querySelector('#reset-forms'));
   show(document.querySelector('#back-button'));
   show(document.querySelector('.comment-section'));
   document.querySelector('.comment-form').addEventListener('submit', evt => {
      evt.preventDefault();
      postComment(id);
   });
};

const postComment = async id => {
   console.log(id);
   const comment = document.querySelector('#comment');
   if (comment.validity.valid) {
      await createComment(id, comment.value);
      const newComments = await getComments(id);
      printComments(newComments);
   }
};

const backButton = document.querySelector('#back-button');
backButton.addEventListener('click', () => {
   location.href = '/';
});

export default beerDetails;
