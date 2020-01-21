import renderHomeShows from './shows.js';
import renderDetail, { removeForm } from './detail.js';
import storage from './storage.js';
import { INPUT_STORAGE_ID, STORAGE_TYPE } from './navbar.js';

const { getItem } = storage(STORAGE_TYPE);

page('/', () => {
  console.log('Route /');
  removeForm();
  renderHomeShows(getItem(INPUT_STORAGE_ID));
});
page('/detail/:id', (ctx) => {
  console.log('Detail');
  const { params: { id } } = ctx;
  renderDetail(id);
});
page();
