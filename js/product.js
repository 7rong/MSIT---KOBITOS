import { products } from './products.js';
// products
const product_list = document.querySelector('.product_list');
const alert_add_cart = document.querySelector('.alert');

function show_products() {
  let str = '';
  products.forEach(function(item){
    return str += `
    <li>
      <feature>
        <img src="img/${item.img}" alt="${item.name}圖">
      </feature>
      <h3>${item.name}</h3>
      <p class="product_price">$${item.price}</p>
      <button type="button" class="minus_btn">
        <i class="fa-solid fa-minus" data-minus="${item.id}"></i>
      </button>
      <span class="num" id="product_num${item.id}">1</span>
      <button type="button" class="plus_btn">
        <i class="fa-solid fa-plus" data-plus="${item.id}"></i>
      </button>
      <button type="button" class="add_to_cart" data-id="${item.id}">加入購物車</button>
    </li>
    `
  })
  product_list.innerHTML = str;
}

// cart

product_list.onclick = function(e){
  let arr_cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (e.target.nodeName == 'BUTTON' && e.target.dataset.id) {
    let id = e.target.dataset.id;
    let num = document.querySelector(`#product_num${id}`).innerText;
    let idx = products.findIndex(item => item.id == id);
    let add_item = products[idx];
    let cart_idx = arr_cart.findIndex(item => item.id == add_item.id);
    if ( cart_idx == -1){
      let obj = {
        id: id,
        num: num,
      }
      arr_cart.push(obj);
    } else {
      arr_cart[cart_idx].num = Number(arr_cart[cart_idx].num) + Number(num);
    }
    let str_cart = JSON.stringify(arr_cart);
    localStorage.setItem('cart',str_cart);

    let nav_cart_num = arr_cart.length;
    const cart_num = document.querySelector('.cart_num');
    cart_num.innerText = nav_cart_num;

    alert_add_cart.classList.add('show');
    setTimeout(function () { alert_add_cart.classList.remove('show'); }, 1000);
    
    document.querySelector(`#product_num${id}`).innerText = 1;
  } else if (e.target.nodeName == 'I') {
    if(e.target.dataset.plus){
      let id = e.target.dataset.plus;
      let num = document.querySelector(`#product_num${id}`).innerText;
      num = Number(num) + 1;
      document.querySelector(`#product_num${id}`).innerText = num;
    } else{
      let id = e.target.dataset.minus;
      let num = document.querySelector(`#product_num${id}`).innerText;
      if(num <= 1){
        console.log(1);
        return
      }
      num = Number(num) - 1;
      document.querySelector(`#product_num${id}`).innerText = num;
    }
  }
}



function init(){
  show_products();
}

init();