// swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// scroll
const grid_item2 = document.querySelector('.item2');
const grid_item6 = document.querySelector('.item6');

window.addEventListener('scroll', function(){
  let pos1 = grid_item2.offsetTop - (window.innerHeight - grid_item2.clientHeight);
  let pos2 = grid_item6.offsetTop - (window.innerHeight - grid_item6.clientHeight);
  if(window.scrollY >= pos1){
    grid_item2.classList.add('show');
  } else {
    grid_item2.classList.remove('show');
  }
  if(window.scrollY >= pos2){
    grid_item6.classList.add('show');
  } else {
    grid_item6.classList.remove('show');
  }
});