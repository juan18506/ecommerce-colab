'use strict'

const productList = document.getElementById('products')
const categoryText = document.getElementById('category')
const productsEndpoint = getProductsEndpoint()
let currentProductsArray
getProductsData(productsEndpoint)
  .then(productsData => showProducts(productsData))

function getProductsEndpoint () {
  const catID = window.localStorage.getItem('catID')
  const productsEndpoint = `${PRODUCTS_URL}${catID}${EXT_TYPE}`
  return productsEndpoint
}

async function getProductsData (productsEndpoint) {
  const productsData = await getJSONData(productsEndpoint)
  return productsData
}

function addProductToHtml (product, delayAnimationTimeMs) {
  const { name, description, image, cost, currency, soldCount } = product

  productList.innerHTML += `
    <li class="ul__li" style="animation-delay: ${delayAnimationTimeMs}ms">
      <img class="ul__img" src=${image} alt="${name}">
        <span class="ul__span ul__span--title">${name}<span class="ul__span ul__span--cost">${cost} ${currency}</span></span>
        <span class="ul__span">${description}</span>
        <span class="ul__span ul__span--soldcount">${soldCount} vendidos</span>
      </div>
    </li>
  `
}

function showProducts (productsData) {
  const { status, data } = productsData

  if (status === 'error') {
    productList.innerHTML += `<li class="ul__li">${data}</li>`
    return
  }

  const { catName, products } = data
  categoryText.innerText = catName

  if (products.length === 0) {
    productList.innerHTML += '<li class="ul__li">No hay productos de esta categoría</li>'
    return
  }

  currentProductsArray = products

  let delayAnimationTimeMs = 25
  products.forEach((product) => {
    addProductToHtml(product, delayAnimationTimeMs)
    delayAnimationTimeMs += 25
  })
}

function sortAndShowProducts(criteria) {
  if (!currentProductsArray) return

  productList.innerHTML = ''
  const sortedProducts = sort(criteria, currentProductsArray)

  let delayAnimationTimeMs = 25
  sortedProducts.forEach((product) => {
    addProductToHtml(product, delayAnimationTimeMs)
    delayAnimationTimeMs += 25
  })
}