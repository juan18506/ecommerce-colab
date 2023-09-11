

const getProductInfo = async () => {
  const productID = localStorage.getItem('productID');
  const { data } = await getJSONData(`${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`);
  return data;
}

const showProductInfo = (productInfo, app) => {
  const { name, cost, description, category, soldCount, currency, images } = productInfo;

  let imgs = '';

  images.forEach(url => {
    imgs += `
      <img class="main__img" src="${ url }" alt="${ name }">
    `;
  });

  app.innerHTML += `
    <h1 class="main__h1">${ name }</h1>

    <section class="main__section">
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

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  getProductInfo()
    .then(productInfo => showProductInfo(productInfo,app));
})
