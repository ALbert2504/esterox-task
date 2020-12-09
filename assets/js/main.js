// const _userList = {
//   userAdd: document.querySelector('.user__add'),
//   __init() {
//     this._setListeners();
//   },
//   _setListeners () {
//     this.userAdd.onclick = () => '';
//     this.userAdd.onclick = () => '';
//     this.userAdd.onclick = () => '';
//   },
// }
// _userList.__init();

const $userAdd = document.querySelector('.user__add');
const $modal = document.querySelector('.modal');
const $modalFields = document.querySelectorAll('.modal__field');
const $modalUpload = document.querySelector('.modal__upload');
const $form = document.querySelector('.modal__form');
const $formSbmtBtn = document.querySelector('.modal__sbmt');
const $userContainer = document.querySelector('.user__container');

const users = [

];

const user = {
  name: '',
  description: '',
  src: '',
};

$userAdd.addEventListener('click', (e) => {
  e.stopPropagation();
  $modal.classList.remove('hidden');
});
window.addEventListener('click', (e) => {
  if(e.target.closest('.modal')) return;
  $modal.classList.add('hidden');
});



$modalFields.forEach((field) => {
  field.addEventListener('input', (e) => {
    const {name, value} = e.target;
    user[name] = value;
  });
});

$modalUpload.addEventListener('change', function(e) {
  if(this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.files[0]);
  }
  function imageIsLoaded(e) {
    user.src = e.target.result;

    const img = document.createElement('img');
    img.setAttribute('src', user.src);
    img.setAttribute('class', 'form__img_preview');
    $form.insertBefore(img, $formSbmtBtn);
    $formSbmtBtn.classList.remove('hidden');
    $modalUpload.parentElement.classList.add('hidden');
  }
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newUser = {
    name: user.name,
    id: `${Math.floor(Math.random() * 1000)}__${user.name}-${Math.floor(Math.random() * 2000)}`,
    description: user.description,
    src: user.src
  }
  if(user.name && user.description) {
    users.push(newUser);
    user.name = '';
    user.description = '';
    user.src = '';
    $modalUpload.value = '';
    $modalFields.forEach((field) => {
      field.value = '';
    });

    $form.removeChild($form.querySelector('.form__img_preview'));
    $formSbmtBtn.classList.add('hidden');
    $modalUpload.parentElement.classList.remove('hidden');
    $modal.classList.add('hidden');
    renderUsers();
  } else {
    alert('Please fill the fields correctly.');
  }
});

function userComponent(user) {
  return `
    <div class="user" id="${user.id}">
      <div class="user__about">
        <div class="user__img-container">
          <img src="${user.src}" alt="user" class="user__img">
        </div>
        <div class="user__info">
          <h3 class="user__info_name">
            ${user.name}
          </h3>
          <p class="user__info_description">
            ${user.description}
          </p>
        </div>
      </div>
      <div class="user__actions">
        <button class="user__actions_delete">
          <i class="fas fa-times"></i>
        </button>
        <div class="user__actions_additional">
          <span class="user__actions_calendar">
            ${date()}
          </span>
        </div>
      </div>
    </div>
  `
};

function date() {
  const date = new Date();
  return date.getDay() + '/' + (+date.getMonth() + 1) + '/' + date.getFullYear();
}

function renderUsers() {
  $userContainer.innerHTML = users.map((user) => {
    return userComponent(user);
  });
  deleteBtnProcess();
}

function deleteBtnProcess() {
  document  
    .querySelectorAll('.user__actions_delete')
    .forEach((btn) => {
      btn.addEventListener('click', deleteUser);
    });
}

function deleteUser() {
  const target = this.parentElement.parentElement;
  const id = target.id;

  const idx = users.findIndex((user) => id === user.id);
  users.splice(idx, 1);
  renderUsers();
}