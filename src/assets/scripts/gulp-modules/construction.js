function initSlider() {
  // eslint-disable-next-line no-undef
  const slider = new Swiper('.js-construction__slider', {
    loop: true,
    navigation: {
      nextEl: document.querySelector('[data-next]'),
      prevEl: document.querySelector('[data-prev]'),
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    watchSlidesVisibility: true,
  });
  if (slider) {
    console.log('');
  }
}
function createSlide(slide) {
  return `<div class="swiper-slide construction__slide">
  <img src="${slide}" title="foto" alt="foto">
 </div>`;
}
function replaceContent(data) {
  const slider = document.querySelector('.js-construction__slider');
  slider.destroy();
  const slidesWrap = document.querySelector('[data-slides-wrap]');
  const slides = data.images.map(createSlide).join('\n');
  slidesWrap.innerHTML = slides;
  initSlider();

  const descriptionContainer = document.querySelector('[data-description-container]');
  descriptionContainer.innerHTML = data.text;
}

function updateSelected(selected, state) {
  const select = selected;
  select.innerHTML = `${state.month} ${state.year}`;
  const oldElement = document.querySelector('[select].disabled');
  oldElement.classList.remove('disabled');
  const currentElement = document.querySelector(`[data-id="${state.selected}"]`);
  currentElement.classList.add('disabled');
}

function getConstruction(id) {
  return window.axios.post('admin-ajax.php', { id });
}

function initDropdown() {
  const state = {
    changeDropdown: false,
    selected: 1,
    year: '2021',
    month: 'dec',
  };
  const container = document.querySelector('[data-select-container]');
  const dropdown = document.querySelector('[data-dropdown]');
  const list = document.querySelector('[data-select-list]');
  const selected = document.querySelector('[data-selected]');

  if (window.innerWidth > 992) {
    const containerHeight = container.clientHeight;
    const selectedHeight = selected.clientHeight;
    const maxHeight = containerHeight - selectedHeight;
    list.style.height = `${maxHeight}px`;
  } else {
    list.style.height = '40vh';
  }

  const changeDropdown = () => {
    dropdown.classList.toggle('active');
  };

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
    state.changeDropdown = !state.changeDropdown;
    changeDropdown();
  });

  document.addEventListener('click', () => {
    if (!state.changeDropdown) return;
    state.changeDropdown = !state.changeDropdown;
    changeDropdown();
  });

  list.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('select')) {
      const { year, month, id } = event.target.dataset;
      getConstruction(id)
        .then(response => response.data)
        .then((data) => {
          console.log(data);
          state.selected = window.parseInt(id);
          state.year = year;
          state.month = month;
          replaceContent(data);
          updateSelected(selected, state);
        }).catch((error) => {
          console.log(error);
        });
    }
  });
}

function init() {
  initSlider();
  initDropdown();
}

document.addEventListener('DOMContentLoaded', init);
