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

// header 滾動監聽

const header = document.querySelector('header');
const nav_text = document.querySelector('.nav');

window.addEventListener('scroll', function(){
  if(window.scrollY > 0){
    header.classList.add('show_color');
    nav_text.classList.add('change_color');
  } else {
    header.classList.remove('show_color');
    nav_text.classList.remove('change_color');
  }
})

// swiper content
let swiper_index = 0;
const btn_prev = document.querySelector('.swiper-button-prev');
const btn_next = document.querySelector('.swiper-button-next');
const kobitos_intro = document.querySelector('.home_kobitos_text');
function change_intro(){
  let swiper_active = document.querySelector('.swiper-slide-active');

  swiper_index = swiper_active.dataset.swiperSlideIndex;

  if(swiper_index == 0){
    kobitos_intro.innerHTML = `
    <h2>粉屁桃</h2>
    <p>棲息在樹上，以吸食果汁維生。</p>
    <p>習慣躲在果實堆裡，</p>
    <p>一不小心就會跟著水果一起出貨...</p>
    <p>身體會散發出和棲息的果實同樣的果香，</p>
    <p>性情溫和是一大特徵！</p>
    <p>因為是在水蜜桃裡發現的，</p>
    <p>故有一說指出民間故事「桃太郎」就是以其為範本。</p>
    `;
  } else if (swiper_index == 1){
    kobitos_intro.innerHTML = `
    <h2>奶奶頭</h2>
    <p>常見於有乳牛的牧草地，</p>
    <p>經常出現在家畜身邊。</p>
    <p>形狀特殊的頭觸可以吸附在乳牛的乳房上吸食牛乳，</p>
    <p>並將其儲存在頭觸裡，轉變成「頭乳」。</p>
    <p>而頭乳的養分甚至是原乳的好幾倍。</p>
    <p>據說嬰兒喝了頭乳後，</p>
    <p>半夜就比較不會哭鬧。</p>
    `;
  } else{
    kobitos_intro.innerHTML = `
    <h2>小花頭</h2>
    <p>棲息在原野等茂密地區的小型醜比頭，</p>
    <p>擁有花瓣般的頭觸。</p>
    <p>肉食性，總是團體行動。</p>
    <p>幾乎所有個體的個性都非常凶悍。</p>
    <p>以昆蟲、蜥蜴、老鼠為主食，</p>
    <p>有時會團體襲擊體型比自己龐大的獵物。</p>
    <p>同伴間經常為了成為集團的領導者而爭吵不休。</p>
    `;
  }
}
change_intro();
btn_prev.addEventListener('click',change_intro);
btn_next.addEventListener('click',change_intro);