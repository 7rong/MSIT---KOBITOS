// swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// modal
let modal = document.getElementById("myModal");
let login_btn = document.querySelector(".btn_login");
let close_btn = document.querySelector(".close");

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
let modal_list = document.querySelector('.modal_list');
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

// login&register
let user = [];