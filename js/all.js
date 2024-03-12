// swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// modal
const modal = document.getElementById("myModal");
const login_btn = document.querySelector(".btn_login");
const close_btn = document.querySelector(".close");

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
modal_list.addEventListener('click',function(e){
  let lists = document.querySelectorAll('.modal_list li');
  toggleList = e.target.dataset.list
  lists.forEach(item => {
    item.classList.remove('active');
  })
  e.target.classList.add('active');
  
  show_modal_form(toggleList);
})

function show_modal_form(list){
  let modal_login = document.querySelector('.modal_login');
  let modal_register = document.querySelector('.modal_register');

  if(list == 'login'){
    modal_login.style.display = 'block';
    modal_register.style.display = 'none';
  } else {
    modal_login.style.display = 'none';
    modal_register.style.display = 'block';
  }
}

show_modal_form('login');

// register
let arr_user = [];
const user = document.querySelector('#user');
const register_account = document.querySelector('#register_account');
const register_pwd = document.querySelector('#register_pwd');
const modal_register_btn = document.querySelector('.modal_register_btn');

modal_register_btn.onclick = function() {
  let obj = {};
  obj.user = user.value;
  obj.account = register_account.value;
  obj.password = register_pwd.value;
  
  arr_user.push(obj);
  let register_success = document.querySelector('.register_success');
  register_success.style.display = 'block';
  setTimeout(()=>{
    let modal_list_login = document.querySelector('.modal_list_login');
    let modal_list_register = document.querySelector('.modal_list_register');
    modal_list_login.classList.add('active');
    modal_list_register.classList.remove('active');
    show_modal_form('login');
  },1500);
}

// login
const login_account = document.querySelector('#login_account');
const login_pwd = document.querySelector('#login_pwd');
const modal_login_btn = document.querySelector('.modal_login_btn');

modal_login_btn.onclick = function(){
  let login_success = document.querySelector('.login_success');
  let login_error = document.querySelector('.login_error');
  let i = arr_user.findIndex(item =>  item.account == login_account.value);

  login_error.style.display = 'none';
  login_success.style.display = 'none';
  
  if(arr_user[i].password == login_pwd.value){
    login_success.style.display = 'block';
    setTimeout(()=> {
      modal.style.display = "none";
      login_btn.innerHTML = `<span>${arr_user[i].user},歡迎回來</span>`;
    },1500);
  } else {
    login_error.style.display = 'block';
  }
}
