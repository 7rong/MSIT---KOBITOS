import { kobitos as arr_kobitos } from './kobitos.js';

let now_category = localStorage.getItem('category') || 'all';
let now_arr_kobitos = [];
let fav_kobitos = [];
const dex_content_list = document.querySelector('.dex_content_list');
const category_li = document.querySelectorAll('.dex_category li');
const no_result = document.querySelector('.no_result');
const search_input = document.querySelector('#search_input');
const search_btn = document.querySelector('#search_btn');

function show_kobitos() {
  let str = '';
  no_result.style.display = 'none';

  category_li.forEach(item => item.classList.remove('active'));

  if (now_category == 'all') {
    category_li[0].classList.add('active');
    now_arr_kobitos = arr_kobitos;
  } else if (now_category == 'outside') {
    category_li[1].classList.add('active');
    now_arr_kobitos = arr_kobitos.filter(item => item.category == '野外');
  } else if (now_category == 'people') {
    category_li[2].classList.add('active');
    now_arr_kobitos = arr_kobitos.filter(item => item.category == '人類周遭');
  } else if (now_category == 'special') {
    category_li[3].classList.add('active');
    now_arr_kobitos = arr_kobitos.filter(item => item.category == '特殊環境');
  } else if (now_category == 'favorite'){
    let new_arr = [];
    category_li[4].classList.add('active');
    fav_kobitos.forEach(function(num) {
      arr_kobitos.forEach(item => {
        new_arr.push(item.id == num);
      })
    });
    now_arr_kobitos = new_arr;

    if (new_arr.length == 0){
      no_result.innerText = '尚未選擇我的最愛';
      no_result.style.display = 'block';
    }
  } else {
    now_arr_kobitos = arr_kobitos.filter(item => search_input.value == item.name || search_input.value == item.feature);

    search_input.value = '';
    
    if (now_arr_kobitos.length == 0){
      no_result.innerText = '未搜尋到相關醜比頭';
      no_result.style.display = 'block';
    }
  }

  now_arr_kobitos.forEach(function (item) {
    str += `
    <li data-id="${item.id}">
      <p>${item.name}</p>
      <img src="../img/${item.img1}.png" alt="${item.name}">
    </li>
    `
  })
  dex_content_list.innerHTML = str;
  dex_content_list.addEventListener('click', show_detail, true);
}

show_kobitos();

const dex_category = document.querySelector('.dex_category');
dex_category.addEventListener('click',function(e){
  localStorage.setItem('category', e.target.dataset.category);
  now_category = localStorage.getItem('category');

  show_kobitos();
})

function show_detail(e){
  let id;
  if(e.target.nodeName == 'LI'){
    id = e.target.dataset.id;
  } else {
    id = e.target.parentNode.dataset.id;
  }
  localStorage.setItem('detail_id',id);
  window.location.href = '../kobitos-intro.html';
}

search_btn.addEventListener('click', function(){
  localStorage.setItem('category', 'search');
  now_category = localStorage.getItem('category');

  show_kobitos();
});