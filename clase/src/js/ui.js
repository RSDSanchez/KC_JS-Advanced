
export const replace = elemento => (removeClass, addClass) => {
  elemento.classList.remove(removeClass);
  elemento.classList.add(addClass);
};

const loader = document.querySelector('#loader');

export const renderLoader = replace(loader);

// const data = [1, 2, 3, 4];

// data.map(item => item * 2) // [2, 4, 6, 8]

// const multiplicar2 = item => item * 2;

// data.map(multiplicar2) // [2, 4, 6, 8]

// const multiplicador = valor => item => item * valor;
// const multiplicador = valor => item => item * valor;

// const newMultiplicar2 = multiplicador(5);
// console.log(newMultiplicar2)
// function (item) {
//   return item * 2;
// }

// data.map(function (item) {
//   return item * 2;
// }) // [2, 4, 6, 8]

