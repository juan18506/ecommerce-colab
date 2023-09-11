'use strict'

let currentProductsArray = null;
let filteredArray = null;
let minCost = 0;
let maxCost = Infinity;

const getProductsEndpoint = () => {
  const catID = localStorage.getItem('catID');
  const productsEndpoint = `${PRODUCTS_URL}${catID}${EXT_TYPE}`;
  return productsEndpoint;
}

const getProductsData = async (productsEndpoint) => {
  const productsData = await getJSONData(productsEndpoint);
  return productsData;
}

const addProductToHtml = (product, productList, delayAnimationTimeMs) => {
  const { id, name, description, image, cost, currency, soldCount } = product;
  
  if (parseInt(cost) < minCost || parseInt(cost) > maxCost) return;
  productList.innerHTML += `
    <li class="ul__li" id="${id}" style="animation-delay: ${delayAnimationTimeMs}ms">
      <img class="ul__img" src=${image} alt="${name}">
      <div class="ul__div">
        <span class="ul__span ul__span--title">${name}<span class="ul__span ul__span--cost">${cost} ${currency}</span></span>
        <span class="ul__span">${description}</span>
        <span class="ul__span ul__span--soldcount">${soldCount} vendidos</span>
      </div>
    </li>
  `;
}

const showProducts = (productsData, productList) => {
  const { status, data } = productsData;

  if (status === 'error') {
    productList.innerHTML += `<li class="ul__li">${data}</li>`;
    return;
  }

  const categoryText = document.getElementById('category');
  const { catName, products } = data;
  categoryText.innerText = catName;

  if (products.length === 0) {
    productList.innerHTML += '<li class="ul__li">No hay productos de esta categoría</li>';
    return;
  }

  currentProductsArray = products;

  let delayAnimationTimeMs = 25;
  products.forEach((product) => {
    addProductToHtml(product, productList, delayAnimationTimeMs);
    delayAnimationTimeMs += 25;
  });
}

const sortAndShowProducts = (criteria, productList) => {
  if (!currentProductsArray) return;

  productList.innerHTML = '';
  const sortedProducts = filteredArray
    ? sortProducts(criteria, filteredArray)
    : sortProducts(criteria, currentProductsArray);

  let delayAnimationTimeMs = 25;
  sortedProducts.forEach((product) => {
    addProductToHtml(product, productList, delayAnimationTimeMs);
    delayAnimationTimeMs += 25;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products');
  const rangeFilterCountMin = document.getElementById('rangeFilterCountMin');
  const rangeFilterCountMax = document.getElementById('rangeFilterCountMax');
  const inputSearch = document.getElementById('search');

  const productsEndpoint = getProductsEndpoint();
  getProductsData(productsEndpoint).then(productsData => showProducts(productsData, productList));

  document.getElementById('sortAsc').addEventListener('click', () => sortAndShowProducts(ORDER_ASC_BY_COST, productList));
  document.getElementById('sortDesc').addEventListener('click', () => sortAndShowProducts(ORDER_DESC_BY_COST, productList));
  document.getElementById('sortByCount').addEventListener('click', () => sortAndShowProducts(ORDER_BY_PROD_COUNT, productList));
  document.getElementById('clearRangeFilter').addEventListener('click', () => {
    rangeFilterCountMin.value = rangeFilterCountMin.defaultValue;
    rangeFilterCountMax.value = rangeFilterCountMax.defaultValue;
    inputSearch.value = inputSearch.defaultValue;
    filteredArray = null;

    minCost = 0;
    maxCost = Infinity;

    sortAndShowProducts(ORDER_BY_FILTER, productList);
  });
  document.getElementById('rangeFilterCount').addEventListener('click', () => {
    minCost = rangeFilterCountMin.value;
    maxCost = rangeFilterCountMax.value;

    minCost = minCost && parseInt(minCost) >= 0 ? parseInt(minCost) : 0;
    maxCost = maxCost && parseInt(maxCost) >= 0 ? parseInt(maxCost) : Infinity;

    sortAndShowProducts(ORDER_BY_FILTER, productList);
  });
  inputSearch.addEventListener('input', () => {
    if (!currentProductsArray) return;
    const query = inputSearch.value.toLowerCase();
    
    filteredArray = currentProductsArray.filter((el) => {
      let { name, description } = el;
      name = name.toLowerCase();
      description = description.toLowerCase();

      return name.includes(query) || description.includes(query);
    });

    sortAndShowProducts(ORDER_BY_FILTER, productList);
  });
  productList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    const { id } = li;
    if (!id) return;

    localStorage.setItem('productID', id);
    location.href = 'product-info.html';
  });
})