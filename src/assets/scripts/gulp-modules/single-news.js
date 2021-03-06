function back() {
  const link = document.querySelector('[data-back]');
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });
}

function setHeightContainer(type) {
  const width = window.innerWidth;
  if (type === 'resize') {
    const container = document.querySelector('[data-container]');
    container.style.height = '';
  }
  if (width <= 992) { return; }
  const img = document.querySelector('[data-img]');
  const height = img.clientHeight;
  const container = document.querySelector('[data-container]');
  container.style.height = `${height}px`;
}

document.addEventListener('DOMContentLoaded', () => {
  setHeightContainer();
  window.locoScroll.update();
  back();
});

window.addEventListener('resize', () => {
  setHeightContainer('resize');
  window.locoScroll.update();
});
