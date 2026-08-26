let lastScrollTop = 0;
const nav = document.querySelector('.header-container');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Скроллим вниз → скрыть
    nav.classList.add('hidden');
  } else {
    // Скроллим вверх → показать
    nav.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для мобильных устройств
});
