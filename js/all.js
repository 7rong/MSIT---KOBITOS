import { products } from './products.js';

// modal
const modal = document.getElementById('myModal');
const login_btn = document.querySelector('.btn_login');
const btn_logout = document.querySelector('.btn_logout')
const close_btn = document.querySelector('.close');

// modal-list
const modal_list = document.querySelector('.modal_list');
let toggleList = 'login';
modal_list.addEventListener('click', function (e) {
  let lists = document.querySelectorAll('.modal_list li');
  toggleList = e.target.dataset.list
  lists.forEach(item => {
    item.classList.remove('active');
  })
  e.target.classList.add('active');

  show_modal_form(toggleList);
})

function show_modal_form(list) {
  let modal_login = document.querySelector('.modal_login');
  let modal_register = document.querySelector('.modal_register');

  if (list == 'login') {
    modal_login.style.display = 'block';
    modal_register.style.display = 'none';
  } else {
    modal_register.style.display = 'block';
    modal_login.style.display = 'none';
  }
}

// register
let arr_user = JSON.parse(localStorage.getItem('all_user')) || [];
const user = document.querySelector('#user');
const register_account = document.querySelector('#register_account');
const register_pwd = document.querySelector('#register_pwd');
const modal_register_btn = document.querySelector('.modal_register_btn');
const register_success = document.querySelector('.register_success');
const register_error = document.querySelector('.register_error');

function setUser(arr) {
  if (arr_user.length == 0) {
    const userStr = JSON.stringify(arr);
    localStorage.setItem('all_user', userStr);
  } else {
    arr_user = JSON.parse(localStorage.getItem('all_user'));
    console.log(arr_user);
  }
};

modal_register_btn.onclick = function () {
  let obj = {};
  obj.user = user.value;
  obj.account = register_account.value;
  obj.password = register_pwd.value;

  register_success.style.display = 'none';
  register_error.style.display = 'none';

  arr_user.push(obj);
  const userStr = JSON.stringify(arr_user);
  localStorage.setItem('user', userStr);

  if (obj.user && obj.account && obj.password) {
    register_success.style.display = 'block';
    setTimeout(() => {
      let modal_list_login = document.querySelector('.modal_list_login');
      let modal_list_register = document.querySelector('.modal_list_register');
      modal_list_login.classList.add('active');
      modal_list_register.classList.remove('active');
      show_modal_form('login');
    }, 1500);
  } else {
    register_error.style.display = 'block';
  }
}

// login
const login_account = document.querySelector('#login_account');
const login_pwd = document.querySelector('#login_pwd');
const modal_login_btn = document.querySelector('.modal_login_btn');
let now_user = sessionStorage.getItem('now_user') || '';

modal_login_btn.onclick = function () {
  let login_success = document.querySelector('.login_success');
  let login_error = document.querySelector('.login_error');
  let i = arr_user.findIndex(item => item.account == login_account.value);

  login_error.style.display = 'none';
  login_success.style.display = 'none';

  if (login_account.value && login_pwd.value){
    if (arr_user[i]&&arr_user[i].password == login_pwd.value) {
      login_success.style.display = 'block';
      setTimeout(() => {
        modal.style.display = "none";
        sessionStorage.setItem('now_user', arr_user[i].user);
        now_user = sessionStorage.getItem('now_user');
        is_login();
      }, 1500);
    } else {
      login_error.style.display = 'block';
    }
  }else{
    login_error.style.display = 'block';
  }
}

//logout
btn_logout.onclick = function () {
  sessionStorage.setItem('now_user', '');
  now_user = sessionStorage.getItem('now_user');
  is_login();
}

// header user
function is_login() {
  if (now_user) {
    login_btn.innerHTML = `<span>Hi, ${now_user}</span>`;
    login_btn.classList.remove('not_login');
    login_btn.classList.add('is_login');
    btn_logout.classList.remove('is_logout');
    btn_logout.classList.add('not_logout');
  } else {
    login_btn.innerHTML = `<span>登入</span>`;
    login_btn.classList.remove('is_login');
    login_btn.classList.add('not_login');
    btn_logout.classList.remove('not_logout');
    btn_logout.classList.add('is_logout');
  }
}

// header cart_num
const cart_num = document.querySelector('.cart_num');
let cart_length = (JSON.parse(localStorage.getItem('cart')) || []).length;

// cart
const cart = document.querySelector('#cart');
const cart_aside = document.querySelector('.cart_aside');
const cart_close = document.querySelector('#cart_close');
const cart_list = document.querySelector('.cart_list');
const no_product = document.querySelector('.no_product');
const cart_sum = document.querySelector('.cart_sum');
const sum_num = document.querySelector('.sum_num');
const pay_btn = document.querySelector('.pay_btn');

cart.onclick = function(){
  show_cart_item();
  cart_aside.classList.add('show');
}

cart_close.onclick = function(){
  cart_aside.classList.remove('show');
}

function show_cart_item(){
  let str = '';
  let now_cart = JSON.parse(localStorage.getItem('cart'))||[];
  let new_arr = [];
  let sum = 0;
  if( now_cart.length ){
    cart_list.style.display = 'block';
    cart_sum.style.display = 'block';
    pay_btn.style.display = 'block';
    no_product.style.display = 'none';
    now_cart.forEach(function(item){
      let product = products.find(p => item.id == p.id);
      product.num = item.num;
      new_arr.push(product);
    })
    new_arr.forEach(function(item, idx){
      str += `
      <li>
        <feature><img src="img/${item.img}" alt="${item.name}圖"></feature>
        <div class="cart_txt">
          <h3>${item.name}</h3>
          <div class="cart_txt_detail">
            <label >數量：</label>
            <input type="number" min="1" value="${item.num}" data-cart-input="${idx}">
            <p>$${item.price * item.num}</p>
          </div>
        </div>
        <i class="fa-solid fa-trash-can delete_btn" data-index="${idx}"></i>
      </li>
      `;
      sum += (item.price*item.num);
    })
    cart_list.innerHTML = str;
    sum_num.innerText = sum;
  } else {
    cart_list.style.display = 'none';
    cart_sum.style.display = 'none';
    pay_btn.style.display = 'none';
    no_product.style.display = 'block';
  }
};

//pay
pay_btn.addEventListener('click', function() {
  pay_btn.innerText = '已成功結帳'
  setTimeout(function(){
    localStorage.removeItem('cart');
    show_cart_item();
    cart_num.innerText = 0;
    cart_aside.classList.remove('show');
  }, 1500);
});

// delete & count
cart_list.addEventListener('click', function(e){
  let now_cart = JSON.parse(localStorage.getItem('cart'));
  if(e.target.nodeName == 'I' && e.target.dataset.index){
    let idx = e.target.dataset.index;
    now_cart.splice(idx, 1);
    let str_cart = JSON.stringify(now_cart);
    localStorage.setItem('cart',str_cart);
    show_cart_item();

    let nav_cart_num = now_cart.length;
    cart_num.innerText = nav_cart_num;
  } else if ( e.target.nodeName == 'INPUT' ) {
    let idx = e.target.dataset.cartInput;
    now_cart[idx].num = e.target.value;
    let str_cart = JSON.stringify(now_cart);
    localStorage.setItem('cart',str_cart);
    show_cart_item();
  }
});

function init(){
  login_btn.onclick = function () {
    modal.style.display = "block";
  }
  close_btn.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  show_modal_form('login');
  setUser(arr_user);
  is_login();
  cart_num.innerText = cart_length;
  show_cart_item();
}
init();

export { show_cart_item };