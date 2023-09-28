const getProductInfo = async () => {
  const productID = localStorage.getItem('productID');
  const { data } = await getJSONData(`${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`);
  return data;
}

const getProductComments = async () => {
  const productID = localStorage.getItem('productID');
  const { data } = await getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}`);
  return data;
}

const getRelatedProducts = async () => {
  const productID = localStorage.getItem('productID');
  const { data } = await getJSONData(`${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`);
  const RelatedProducts= data.relatedProducts
  return RelatedProducts;
}

const showRelatedProducts = (RelatedProducts) =>{
  let containerRelatedProducts= document.getElementById('containerRelatedProducts')

  RelatedProducts.forEach(i => {
    let containerEach=document.createElement('div')
    containerEach.classList.add('card', 'divRP')
    let name= i.name
    let id= i.id
    let img= i.image

    containerEach.innerHTML+=`
      <img class="card-img-top" src="${ img }" onclick="setProductID(${ id })">
      <div class="card-body">
        <span class="card-title">${ name }</span>
      </div>
    `
    containerRelatedProducts.appendChild(containerEach)
  });
  
}

const showProductInfo = (productInfo) => {
  const productSection = document.getElementById('app');
  const { name, cost, description, category, soldCount, currency, images } = productInfo;

  let imgs = '';

  for (let i = 1; i < images.length; i++){
    imgs += `
      <div class="carousel-item">
        <img class="d-block w-100" src="${ images[i] }" alt="${ name }">
      </div>
    `;
  };

  productSection.innerHTML += `
    <h1 class="main__h1">${ name }</h1>

    <section class="main__section mt-4">
      <h3 class="main__h3"> Precio </h3>
      <p class="main__p">${ currency } ${ cost }</p>
    </section>
    <section class="main__section">
      <h3 class="main__h3"> Descripción </h3>
      <p class="main__p">${ description }</p>
    </section>
    <section class="main__section">
      <h3 class="main__h3"> Categoría </h3>
      <p class="main__p">${ category }</p>
    </section>
    <section class="main__section">
      <h3 class="main__h3"> Cantidad de vendidos </h3>
      <p class="main__p">${ soldCount }</p>
    </section>
    <section class="main__section">
      <h3 class="main__h3"> Imágenes ilustrativas </h3>
      <div id="carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${ images[0] }" class="d-block w-100" alt="${ name }">
          </div>
          ${ imgs }
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <div class="carrousel-arrow-bg">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </div>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <div class="carrousel-arrow-bg">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </div>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  `;
}

const setProductID = (id) => {
  localStorage.setItem('productID', id);
  location = 'product-info.html';
}

const addCommentToHtml = (comment) => {
  const commentsList = document.getElementById("comments-list");
  const { user, dateTime, score, description } = comment;

  let commentStars = '';
  for (let i = 1; i <= 5; i++) {
    const color = (score>= i) ? '#febf01' : '#c0c0c0';

    commentStars += `
      <i class="fas fa-star" style="color: ${ color };"></i>
    `;
  }

  commentsList.innerHTML += `
    <li class="comments__li">
      <header class="comments__header">
        <span class="comments__span">${ user }</span> - <span class="date__span">${ dateTime } </span> - <span>${ commentStars }</span>
      </header>

      <main class="comment__main">${ description }</main> 
    </li>
  `;
}

const showProductComments = (comments) => {
  comments.forEach((comment) => {
    addCommentToHtml(comment);
  });
}

const getDate = () => {
  const date = new Date();

  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    hour: date.getHours().toString().padStart(2, '0'),
    minutes: date.getMinutes().toString().padStart(2, '0'),
    seconds: date.getSeconds().toString().padStart(2, '0'),
  }
}

document.getElementById('SendComm').addEventListener('click', () => {
  const { year, month, day, hour, minutes, seconds } = getDate();

  const comment = {
    user: localStorage.getItem('user').split('@')[0],
    dateTime: `${ year }-${ month }-${ day } ${ hour }:${ minutes }:${ seconds }`,
    description: document.getElementById('comm').value,
    score: document.getElementById('stars').value,
  };

  addCommentToHtml(comment);
});

document.addEventListener('DOMContentLoaded', () => {
  getProductInfo()
    .then(productInfo => showProductInfo(productInfo));

  getProductComments()
    .then(productComments => showProductComments(productComments));

  getRelatedProducts()
    .then(relatedProducts => showRelatedProducts(relatedProducts))
});
