document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('france').addEventListener('click', (e) => {
    document.getElementById('aside-slider-germany').classList.add('aside-slider__hidden')
    document.getElementById('aside-slider-england').classList.add('aside-slider__hidden')
  })
  document.getElementById('france').addEventListener('click', (e) => {
    document.getElementById('aside-slider-france').classList.remove('aside-slider__hidden')

  })
  document.getElementById('germany').addEventListener('click', (e) => {
    document.getElementById('aside-slider-france').classList.add('aside-slider__hidden')
    document.getElementById('aside-slider-england').classList.add('aside-slider__hidden')
  })
  document.getElementById('germany').addEventListener('click', (e) => {
    document.getElementById('aside-slider-germany').classList.remove('aside-slider__hidden')
  })
  document.getElementById('england').addEventListener('click', (e) => {
    document.getElementById('aside-slider-germany').classList.add('aside-slider__hidden')
    document.getElementById('aside-slider-france').classList.add('aside-slider__hidden')
  })
  document.getElementById('england').addEventListener('click', (e) => {
    document.getElementById('aside-slider-england').classList.remove('aside-slider__hidden')
  })
})



// Добавление в корзину 

const basketSlider = document.querySelector('.basket-slider')

window.addEventListener('click', function (event) {

  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.aside-slider__slide')

    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.aside-slider__slide-img').getAttribute('src'),
      subTitle: card.querySelector('.aside-slider__slide-subtitle').innerText,
      title: card.querySelector('.aside-slider__slide-title').innerText,
      info: card.querySelector('.aside-slider__slide-info').innerText,
      price: card.querySelector('.aside-slider__slide-price').innerText,

    }

    // Поиск товара в корзине
    const itemInCart = basketSlider.querySelector(`[data-id="${productInfo.id}"]`);
    if (itemInCart) {
      return false;
    }
  

      // Добавление товара в корзину 
    const cartItemHTML = `<div class="basket-slider__slide" data-id="${productInfo.id}">
            <img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="basket-slider__slide-img">
            <div class="basket-wrapper">
              <h3 class="basket-slider__slide-subtitle">${productInfo.subTitle}</h3>
              <h2 class="basket-slider__slide-title">${productInfo.title}</h2>
              <p class="basket-slider__slide-info">${productInfo.info}</p>
              <p class="basket-slider__slide-price">${productInfo.price}</p>
              <button class="basket-slider__delete" data-action="delete">Удалить</button>
            </div>
            
          </div>`;


    basketSlider.insertAdjacentHTML('beforeend', cartItemHTML);
  }
  if (event.target.dataset.action === 'delete') {
    event.target.closest('.basket-slider__slide').remove();
 }
});

// Кнопка магазин 
document.getElementById('modal-btn').addEventListener('click', function() {
  document.getElementById('modal').classList.add('container-basket__open');
})

document.getElementById('close-modal__btn').addEventListener('click', function() {
  document.getElementById('modal').classList.remove('container-basket__open');
})


