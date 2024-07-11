import Splide from '@splidejs/splide';

const EL = '.js-references';
const ACTIVE_CLASS = 'is-active';

if (document.querySelector(EL)) {
  const slider = new Splide(EL, {
    pagination: false,
    arrows: true,
    perPage: 3,
    gap: 30,
    perMove: 1,
    breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      }
    }
  }).mount();
}
