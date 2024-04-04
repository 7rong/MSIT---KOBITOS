import { kobitos as arr_kobitos } from './kobitos.js';
let now_id = localStorage.getItem('detail_id');

const intro_img = document.querySelector('.intro_img');
const intro_title = document.querySelector('.intro_inform_title');
const inform_height = document.querySelector('#inform_height');
const inform_live = document.querySelector('#inform_live');
const inform_feature = document.querySelector('#inform_feature');
const intro_more_img = document.querySelector('.intro_more_img img');
const inform_doing1 = document.querySelector('#inform_doing1');
const inform_doing2 = document.querySelector('#inform_doing2');

function show_detail(){
  let now_kobitos = arr_kobitos.find(item => item.id == now_id);
  
  intro_img.src = `img/${now_kobitos.img1}.png`;
  intro_img.alt = now_kobitos.name;
  intro_title.innerText = now_kobitos.name;
  inform_height.innerText = now_kobitos.height;
  inform_live.innerText = now_kobitos.live;
  inform_feature.innerText = now_kobitos.feature;
  intro_more_img.src = `img/${now_kobitos.img2}.png`;
  intro_more_img.alt = `${now_kobitos.name}生活照`;
  inform_doing1.innerText = now_kobitos.doing1;
  inform_doing2.innerText = now_kobitos.doing2;
}

const back_btn = document.querySelector('.back_btn');
back_btn.onclick = function (){
  history.go(-1);
}

const icon_fav = document.querySelector('.icon_fav');
const arr_icon = document.querySelectorAll('.icon_fav i');

let arr_fav = [];
let idx;

function get_idx(){
  arr_fav = JSON.parse(localStorage.getItem('favorite')) || [];
  idx = arr_fav.findIndex(item => item == now_id);
}

function check_fav() {
  if ( idx == -1 ) {
    arr_icon[0].classList.add('active');
    arr_icon[1].classList.remove('active');
  } else {
    arr_icon[1].classList.add('active');
    arr_icon[0].classList.remove('active');
  }
}

const alert_fav = document.querySelector('.alert');
const alert_p = document.querySelectorAll('.alert p');

icon_fav.addEventListener('click',function(){
  arr_icon.forEach(item => item.classList.toggle('active'));
  alert_p.forEach(item => item.style.display = 'none');

  get_idx();
  if ( idx == -1 ) {
    arr_fav.push(now_id);
    alert_p[0].style.display = 'block'
    alert_fav.classList.add('show');
    setTimeout(function () { alert_fav.classList.remove('show'); }, 1000);
  } else {
    arr_fav.splice(idx, 1);
    alert_p[1].style.display = 'block'
    alert_fav.classList.add('show');
    setTimeout(function () { alert_fav.classList.remove('show'); }, 1000);
  }
  const favStr = JSON.stringify(arr_fav);
  localStorage.setItem('favorite', favStr);
})

function init(){
  show_detail();
  get_idx();
  check_fav();
}
init();