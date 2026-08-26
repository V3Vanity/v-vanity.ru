let lastDirection = 0; // 1 - вниз, -1 - вверх
const nav = document.querySelector('.header-container');
const navLinks = document.querySelectorAll('a[href^="#"]'); // Получаем все ссылки для навигации
const sections = document.querySelectorAll('.section');

// Скроллим страницу наверх при загрузке
window.onload = function () {
  window.scrollTo(0, 0);
};

// Скроллинг header при прокрутке
window.addEventListener('wheel', function (event) {
  if (event.deltaY > 0) {
    // Скроллим вниз
    if (lastDirection !== 1) {
      nav.classList.add('hidden');
      lastDirection = 1;
    }
  } else {
    // Скроллим вверх
    if (lastDirection !== -1) {
      nav.classList.remove('hidden');
      lastDirection = -1;
    }
  }
}, { passive: true });

// Эффект слежения
const box = document.querySelector('.main-img');
document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;
  const offsetX = e.clientX - centerX;
  const offsetY = e.clientY - centerY;

  const rotateX = (offsetY / centerY) * 20;
  const rotateY = (offsetX / centerX) * 20;

  box.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  box.style.transition = 'transform 0.2s ease-out';

  const highlight = box.querySelector('::before');
  if (highlight) {
    highlight.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  }
});

// ПОЯВЛЕНИЕ ТЕКСТА 
const hiddenTexts = document.querySelectorAll('.info-title');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

hiddenTexts.forEach(el => observer.observe(el));

// АНИМАЦИЯ ПОЯВЛЕНИЯ СПИСКА
document.querySelector('.info-service').addEventListener('click', function () {
  document.querySelector('.info-service__list').classList.toggle('open');
  document.querySelectorAll('.info-service__list-item').forEach(function (item) {
    item.classList.toggle('open-item');
  });
});

// Плавный скролл по секциям при клике на навигацию
navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Отменяем стандартное поведение ссылок

    // Получаем идентификатор секции
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    // Плавно прокручиваем до секции
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Скрываем меню после клика на ссылку
    const navMenu = document.getElementById('header-nav');
    navMenu.classList.remove('header-nav__active');
  });
});

// Снаппинг по секциям при скролле
let currentSectionIndex = 0;

function nextSection() {
  if (currentSectionIndex < sections.length - 1) {
    currentSectionIndex++;
    scrollToSection(currentSectionIndex);
  }
}

function prevSection() {
  if (currentSectionIndex > 0) {
    currentSectionIndex--;
    scrollToSection(currentSectionIndex);
  }
}

function scrollToSection(index) {
  sections[index].scrollIntoView({ behavior: 'smooth' });
}

// Обработка прокрутки колесом
window.addEventListener('wheel', function (event) {
  if (event.deltaY > 0) {
    // Прокрутка вниз (следующий блок)
    nextSection();
  } else {
    // Прокрутка вверх (предыдущий блок)
    prevSection();
  }
}, { passive: true });

// Слайдер
let currentIndex = 0;
const slidesContainer = document.querySelector('.slider-slides');
const slides = document.querySelectorAll('.slider-slides__slide');
const progressFill = document.querySelector('.progress-fill');

function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, i) => {
    slide.style.opacity = (i === currentIndex) ? '1' : '0.5';
    slide.style.transform = (i === currentIndex) ? 'scale(1)' : 'scale(0.8)';
  });

  let progressPercent = ((currentIndex + 1) / slides.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
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
let startTouchX = 0;
let isTouching = false;

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

// Сенсорное взаимодействие для мобильных устройств (свайпы)
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

  if (Math.abs(swipeDistance) > 50) { // Порог свайпа
    if (swipeDistance > 0) {
      goToSlide(currentIndex - 1); // свайп вправо
    } else {
      goToSlide(currentIndex + 1); // свайп влево
    }
  }
}


// Инициализация слайдера
updateSlider();

const prevButton = document.querySelector('.slider-button__prev');
const nextButton = document.querySelector('.slider-button__next');

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

// Контактная форма и маска для телефона
const phoneInput = document.getElementById('phone');
const maskOptions = {
  mask: '+7 (000) 000-00-00'
};
IMask(phoneInput, maskOptions);

// AJAX отправка формы
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let formData = new FormData(this);

  fetch('php/send.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      let message = document.getElementById('formMessage');
      if (result === 'success') {
        message.textContent = '✅ Ваше сообщение успешно отправлено!';
        message.style.color = 'green';
        this.reset();
      } else {
        message.textContent = '❌ Ошибка при отправке. Попробуйте позже.';
        message.style.color = 'red';
      }
    })
    .catch(() => {
      let message = document.getElementById('formMessage');
      message.textContent = '❌ Ошибка соединения.';
      message.style.color = 'red';
    });
});

// Меню бургер
const burger = document.getElementById('burger');
const navs = document.getElementById('nav');

burger.addEventListener('click', () => {
  navs.classList.toggle('header-nav__active');
});