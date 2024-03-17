let arr_finding = [
  {
    name: '王小明',
    img: 'finding03.png',
    desc: '這是我家的樂陶陶，經過兩週的熟悉，現在我們相處融恰！',
  },
  {
    name: '朵拉',
    img: 'finding04.png',
    desc: '這是我第五次嘗試，終於在拉拉山上捕捉到珍貴的照片！粉屁桃現蹤啦～～～'
  },
  {
    name: '宋小美',
    img: 'finding05.png',
    desc: '這次在草叢看見食蟲花，沒有注意到後頭兇狠的小花頭，還有在被攻擊前，拍了張照我就離開了。'
  }
];

function setFinding(arr) {
  if(JSON.parse(localStorage.getItem('finding')).length == 0){
    const findingStr = JSON.stringify(arr);
    localStorage.setItem('finding', findingStr);
  } else {
    arr_finding = JSON.parse(localStorage.getItem('finding'));
  }
}

setFinding(arr_finding);

const finding_list = document.querySelector('.finding_list');

function show_finding() {
  let str = '';
  arr_finding.forEach(function(item, index){
    str += `
    <li>
      <div class="finding_img">
        <img src="img/${item.img}" alt="${item.name}的大發現" id="finding${index}">
      </div>
      <div class="finding_text">
        <h2>${item.name}</h2>
        <p>${item.desc}</p>
      </div>
    </li>
    `;
  });

  finding_list.innerHTML = str;
}

show_finding();

const want_upload_btn = document.querySelector('.finding_upload_btn');
const upload_form = document.querySelector('.upload_form');
const alert_login = document.querySelector('.alert_login');

want_upload_btn.addEventListener('click', function(){
  // if (now_user) {
    upload_form.style.display = 'block';
    want_upload_btn.style.display = 'none';
  // } else {
  //   alert_login.classList.add('show');
  //   setTimeout(function(){ alert_login.classList.remove('show'); }, 1000);
  // }
});

const user_upload_btn = document.querySelector('.user_upload_btn');
const upload_text = document.querySelector('#upload_text');
const upload_file = document.querySelector('#upload_file');
const download = document.querySelector('.download');

user_upload_btn.addEventListener('click', function(){
  let txt = upload_text.value;
  let img = '';

  if(upload_file.files[0]){
    let new_item = {
      name: now_user,
      img: img,
      desc: txt,
    }
    
    arr_finding.unshift(new_item);
    localStorage.setItem('finding', JSON.stringify(arr_finding));
    show_finding();

    let reader = new FileReader();
    reader.onload = function (e) {
      let upload_img = document.querySelector('#finding0');
      upload_img.setAttribute('src', e.target.result)
    }
    reader.readAsDataURL(upload_file.files[0]);

    upload_form.style.display = 'none';
    want_upload_btn.style.display = 'block';
    show_download();
  }
});

let now_user = sessionStorage.getItem('now_user');

function show_download(){
  let num = arr_finding.findIndex(item => item.name == now_user);

  if (num != -1){
    download.style.display = 'block';
  } else {
    download.style.display = 'none';
  }
}

show_download();
