const scrollToTopButton = document.getElementById('scrollToTop');
let catsData = [
	{
  	id: 1,
    name: 'Кот полосатый',
    price: '30 000',
    age: 1,
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/2.jpg',
    discount: '40',
    available: true
  },
  {
  	id: 2,
    name: 'Кот полосатый',
    price: '20 000',
    age: 9,    
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/1.jpg',
    available: false
  },
  {
  	id: 3,
    name: 'Кот полосатый',
    price: '40 000',
    age: 4,    
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/3.jpg',
    available: true
  },
  {
  	id: 4,
    name: 'Кот полосатый',
    price: '25 000',
    age: 3,
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/2.jpg',
    discount: '40',
    available: true
  },
  {
  	id: 5,
    name: 'Кот полосатый',
    price: '10 000',
    age: 3,
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/3.jpg',
    available: false
  },
  {
  	id: 6,
    name: 'Кот полосатый',
    price: '10 000',
    age: 3,
    color: 'коричневый окрас',
    paws: 4,
    avatar: 'images/1.jpg',
    available: true
  }
];

function render(cats) {
	if (!Array.isArray(cats)) return;
	let resultHTML = '';
  cats.forEach(cat => {
  	resultHTML += generateCatCard(cat);
  });
	const container = document.getElementById('catsList');
  container.innerHTML = resultHTML;
  setupLikeButtons();
}

function generateCatCard(cat) {
  return `<div class="catCard" data-id="${cat.id}">
            <div class="avatarPosition">
              <img src="${cat.avatar}" alt="" class="avatar">
              ${cat.discount ? '<div class="discount"><p>' + cat.discount + '%</p></div>' : ''}
              <button class="likeButton ${cat.wishlisted ? 'liked' : ''}">
                <img src="./images/heart-icon.png" alt="" class="heart">
              </button>
            </div>
            <div class="box">
              <h4 class="name">${cat.name}</h4>
            <div class="gridParam">
                <div class="border">
                  <p class="params">Коричневый окрас</p>
                </div>
              <div>
                <h3>${cat.age} мес.</h3>
                <p class="params">Возраст</p>
              </div>
              <div>
                <h3>${cat.paws}</h3>
                <p class="params">Кол-во лап</p>
              </div>
            </div>
            <h4 class="price">${cat.price} руб.</h4>
            </div>
            <button class="${cat.available ? 'toBuy' : 'soldOut'}">
              <h3 class="white">${cat.available ? 'Купить' : 'Продан'}</h3>
            </button>
          </div>`;
}

function setupLikeButtons() {
	document.querySelectorAll('.catCard').forEach(el => {
    const likeButton = el.querySelector('.likeButton');
    if (!likeButton) return;
    const alreadyWishlisted = likeButton.classList.contains('liked');
  	likeButton.addEventListener('click', () => {
      updateCatRecord(catsData, el.dataset.id, { wishlisted: !alreadyWishlisted });
      render(catsData);
    	alert(`Cat with id ${el.dataset.id} was ${!alreadyWishlisted ? 'added to' : 'removed from'} favourites`);
    })
  });
}

function updateCatRecord(cats, id, data = {}) {
  if (!Array.isArray(cats)) return;
  let catIndex;
  const cat = cats.find((cat, index) => {
    if (cat.id == id) {
      catIndex = index; 
      return true;
    }
  });
  cats.splice(catIndex, 1, { ...cat, ...data });
  return cats;
}

function sortBy(parameter, type) {
  if (type === 'asc') {
  	catsData = catsData.sort((a, b) => ascSorting(a, b, parameter));
  	render(catsData);
  }
  if (type === 'desc') {
  	catsData = catsData.sort((a, b) => descSorting(a, b, parameter));
  	render(catsData);
  }
}

function ascSorting(a, b, parameter) {
	if (a[parameter] < b[parameter]) return -1;
  if (a[parameter] > b[parameter]) return 1;
  return 0;
}

function descSorting(a, b, parameter) {
	if (a[parameter] > b[parameter]) return -1;
  if (a[parameter] < b[parameter]) return 1;
  return 0;
}

function setUpSortButtons() {
  document
    .querySelectorAll('.sortButtons')
    .forEach(el => {
      el.addEventListener('change', ({target}) => {
        if (target.value === 'priceAsc') sortBy('price', 'asc');
        if (target.value === 'priceDesc') sortBy('price', 'desc');
        if (target.value === 'ageAsc') sortBy('age', 'asc');
        if (target.value === 'ageDesc') sortBy('age', 'desc');
      });
    })
}

function setUpEmailValidation() {
  const hiddenClassName = 'hidden';
  const classList = document.querySelector('.emailErrorMessage').classList;

  document.getElementById('email').addEventListener('input', event => {
    const email = event.target.value;
    if (!emailIsValid(email)) classList.remove(hiddenClassName);
    if (emailIsValid(email)) classList.add(hiddenClassName);
  });
}

function emailIsValid(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function setUpScrollToTop() {
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  })
  window.onscroll = toggleScrollToTopButtonVisibility;
}

function toggleScrollToTopButtonVisibility() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function onStart() {
  setUpSortButtons();
  setUpEmailValidation();
  setUpScrollToTop();
  toggleScrollToTopButtonVisibility();
	render(catsData);
}
document.addEventListener('DOMContentLoaded', onStart);
