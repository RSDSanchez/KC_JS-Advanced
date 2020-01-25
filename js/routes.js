import loadSectionContainer from './main.js';
import beerDetails from './detail.js';

page('/', () => {
   console.log('Route /');
   loadSectionContainer();
});
page('/detail/:id', ctx => {
   console.log('Detail');
   const {
      params: { id }
   } = ctx;
   beerDetails(id);
});

page();
