ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map("map", {
    center: [55.765194, 37.605146],
    zoom: 12.4,
    controls: []
  }, {
    suppressMapOpenBlock: true
  });

  // Убираем все управляющие элементы
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('zoomControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('geolocationControl');

  // Добавим основную метку
  const myPlacemark = new ymaps.Placemark([55.765194, 37.605146], {
    hintContent: 'Тверская 24',
    balloonContent: 'Ул. Тверская, 24, Москва'
  }, {
    preset: 'islands#redDotIcon'
  });

  myMap.geoObjects.add(myPlacemark);

  // Добавляем дополнительные метки
  const additionalPlacemarks = [
    { coords: [55.769357, 37.568440], hint: 'Советская, 12', balloon: 'Адрес или описание 2' },
    { coords: [55.752138, 37.652985], hint: 'Веницианская, 34', balloon: 'Адрес или описание 3' },
    { coords: [55.744323, 37.676595], hint: 'Красная, 49', balloon: 'Адрес или описание 4' },
    { coords: [55.732120, 37.628526], hint: 'Ленина, 16', balloon: 'Адрес или описание 5' }
  ];

  additionalPlacemarks.forEach(({ coords, hint, balloon }) => {
    const placemark = new ymaps.Placemark(coords, {
      hintContent: hint,
      balloonContent: balloon
    }, {
      preset: 'islands#blueDotIcon' // Можно изменить цвет меток, если нужно
    });
    myMap.geoObjects.add(placemark);
  });

  // CSS-фильтр для затемнения карты
  const mapEl = document.getElementById('map');
  mapEl.style.filter = 'grayscale(1) brightness(0.5) contrast(4)';
}


// Слайдер
let currentIndex = 0;
const slidesContainer = document.querySelector('.slider-slides');
const slides = document.querySelectorAll('.slider-slides__slide');
const visibleSlides = 3;
const progressDots = document.querySelectorAll('.progress-dots .dot');

function updateSlider() {
  const slideWidthPercent = 100 / visibleSlides;

  slidesContainer.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

  slides.forEach((slide, i) => {
    slide.style.opacity = (i >= currentIndex && i < currentIndex + visibleSlides) ? '1' : '0.5';
    slide.style.transform = (i >= currentIndex && i < currentIndex + visibleSlides) ? 'scale(1)' : 'scale(1)';
  });

  // Обновление точек прогресса
  const maxIndex = slides.length - visibleSlides;
  const totalDots = progressDots.length;
  const step = maxIndex / (totalDots - 1);
  const activeDotIndex = Math.round(currentIndex / step);

  progressDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeDotIndex);
  });
}

function goToSlide(index) {
  const maxIndex = slides.length - visibleSlides;
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlider();
}

// Обработчик клика на активный слайд
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    if (i === currentIndex) {
      const link = slide.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank');
      }
    }
  });
});

// Обработчики слайдера (перетаскивание и свайпы)
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

slidesContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = slidesContainer.scrollLeft;
  e.preventDefault();
});

slidesContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const moveX = e.pageX - startX;
  slidesContainer.scrollLeft = scrollLeft - moveX;

  if (Math.abs(moveX) > slides[0].offsetWidth / 2) {
    if (moveX > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex + 1);
    }
    startX = e.pageX;
    scrollLeft = slidesContainer.scrollLeft;
  }
});

slidesContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

slidesContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});

// Сенсорное взаимодействие
let touchStartX = 0;
let touchEndX = 0;

slidesContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slidesContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex + 1);
    }
  }
}

// Инициализация
updateSlider();

const prevButton = document.querySelector('.slider-button__prev');
const nextButton = document.querySelector('.slider-button__next');

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

// ФОРМА ОБРАТНОЙ СВЯЗИ 

document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault(); // отключаем стандартную отправку формы

  const email = document.getElementById('emailInput').value;
  const resultDiv = document.getElementById('result');

  fetch('php/send.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'email=' + encodeURIComponent(email)
  })
  .then(response => response.text())
  .then(data => {
    resultDiv.textContent = data;  // показываем ответ сервера
  })
  .catch(() => {
    resultDiv.textContent = 'Ошибка отправки.';
  });
});
