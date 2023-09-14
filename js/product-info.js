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

const showProductInfo = (productInfo) => {
  const productSection = document.getElementById('app');
  const { name, cost, description, category, soldCount, currency, images } = productInfo;

  let imgs = '';

  images.forEach(url => {
    imgs += `
      <img class="main__img" src="${ url }" alt="${ name }">
    `;
  });

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
      <div class="main__div">
        ${ imgs }
      </div>
    </section>
  `;
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
        <span class="comments__span">${ user }</span> - ${ dateTime } - <span>${ commentStars }</span>
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
});
