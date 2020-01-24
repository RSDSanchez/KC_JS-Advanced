import api from './api.js';
import { hide, show } from './global.js';

const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1'

const { getBeerById } = api();
const { getComments, createComment } = api(QUOTES_API);

const detailTemplate = (beer) => {
    return `
   <article class="item">
      <h1>${beer.name}</h1>
      
   </article>
   `;
};

const commentTemplate = comment => {
    return `<div>${comment.quote} - ${comment.date}</div>`;
};


const printBeer = beer => {
    const sectionContainer = document.querySelector('.section-container');
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


const beerDetails = async(id) => {
    const beer = await getBeerById(id);
    const comments = await getComments(id);
    printBeer(beer);
    printComments(comments);
    show(document.querySelector('.comment-section'));
    document.querySelector('.comment-form').addEventListener('submit', evt => {
        evt.preventDefault();
        postComment(id);
    });
}

const postComment = async(id) => {
    console.log(id);
    const comment = document.querySelector('#comment');
    if (comment.validity.valid) {
        await createComment(id, comment.value);
        const newComments = await getComments(id);
        printComments(newComments);
    }
};


export default beerDetails;