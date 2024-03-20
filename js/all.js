// modal
const modal = document.getElementById('myModal');
const login_btn = document.querySelector('.btn_login');
const btn_logout = document.querySelector('.btn_logout')
const close_btn = document.querySelector('.close');

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

show_modal_form('login');

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

setUser(arr_user);

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

is_login();

// header fav
const nav_fav = document.querySelector('.nav_fav');
const fav_num = document.querySelector('.fav_num');
let num = (JSON.parse(localStorage.getItem('favorite')) || []).length;

nav_fav.onclick = function () {
  localStorage.setItem('category', 'favorite');
}

fav_num.innerText = num;