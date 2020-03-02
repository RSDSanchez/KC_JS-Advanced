import loadSectionContainer from './main.js';
import beerDetails from './detail.js';

page('/', () => {
  loadSectionContainer();
});
page('/detail/:id', (ctx) => {
  const {
    params: { id },
  } = ctx;
  beerDetails(id);
});

page();
