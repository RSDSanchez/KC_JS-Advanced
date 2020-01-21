import api from './api.js';
import { renderLoader } from './ui.js';

const detailTeplate = ({ id, name, image, summary } = {}) => `
  <div class="detail-section">
    <header id="${id}">
      <div class="title-section">
        <h1>${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image.original : '/images/defaultImage.png'}" />
      </div>
    </header>
    <div class="content">
      ${summary}
    </div>
  </div>
`;

const quotesFormtemplate = `
  <div id="detail" class="detail-content"></div>
  <div class="quotes-list">
    <h2>Quotes</h2>
    <div id="quoteList">
    </div>
  </div>
  <form id="quote-form" method="POST" class="quote-form" novalidate>
    <div class="quote-input">
      <label for="quote">Quote of this show</label>
      <input name="kevin" required id="quote" placeholder="Add your quote" class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add quote</button>
  </form>
`;


const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1'

const { getShowDetail } = api();
const { getQuotes, createQuote } = api(QUOTES_API);

const renderForm = id => {
  const formSection = document.querySelector('#detailSection');
  formSection.innerHTML = quotesFormtemplate; // form pintado
  const quoteForm = document.getElementById('quote-form');
  const quoteList = document.querySelector('#quoteList');
  const quoteInput = document.getElementById('quote');
  quoteForm.addEventListener('submit', async evt => {
    evt.preventDefault();
    if (quoteInput.validity.valid) {
      // 1. Llamar API crear Quote
      await createQuote(id, quoteInput.value);
      // 2. Renderizo o pinto en el DOM
      //   1. caso -> como el result = nuevo quote
      //              lo que hago es llamar una funcion renderQuote(result.quote)
      //              y añade como último comentario

      //   2. caso -> como la promesa es exitosa yo se que se guarda por el API
      //              lo que hago es llamar una funcion renderQuote(quoteInput.value)
      //              y añade eso como último comentario

      //   3. caso -> se que la promesa es exitosa
      //              pero lo que hago es traer toda la lista para pintarla como 
      //              en la función renderDetail
      quoteList.innerHTML += quoteTemplate({
        quote: quoteInput.value,
        date: new Date(),
      });
      quoteInput.value = '';
    }
  });
};

export const removeForm = () => {
  const formSection = document.querySelector('#detailSection');
  formSection.innerHTML = '';
};

const quoteTemplate = ({ quote, date }) => `
  <div class="list-item">
    <p>${quote}</p>
    <span>${date}</span>
  </div>
`;

const renderDetail = async id => {
  try {
    renderLoader('hide', 'show');
    const [detail, quotes] = await Promise.all([
      getShowDetail(id),
      getQuotes(id),
    ]); // [resolveP1, resolveP2]
    const template = detailTeplate(detail);
    const mainSection = document.querySelector('main');
    renderForm(id);
    const quoteList = document.querySelector('#quoteList');
    quoteList.innerHTML = quotes.map(quoteTemplate).join(''); // [1, 3] -> '13'
    mainSection.innerHTML = template;
  } catch (err) {
    // manejo errores
    console.error(err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export default renderDetail;
