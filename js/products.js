'use strict'

const ul = document.getElementById('products')
const spanCategory = document.getElementById('category')

function getProductsEndpoint () {
  const productsEndpoint = `${PRODUCTS_URL}101${EXT_TYPE}`
  return productsEndpoint
}

async function getProductsData (productsEndpoint) {
  const productsData = await getJSONData(productsEndpoint)
  return productsData
}

function addProductToHtml (product, delayAnimationTimeMs) {
  const { name, description, image, cost, currency, soldCount } = product

  ul.innerHTML += `
      <li class="ul__li" style="animation-delay: ${delayAnimationTimeMs}ms">
        <img class="ul__img" src=${image} alt="${name}">
        <div class="ul__div">
          <span class="ul__span ul__span--title">${name}<span class="ul__span ul__span--cost">${cost} ${currency}</span></span>
          <span class="ul__span">${description}</span>
          <span class="ul__span ul__span--soldcount">${soldCount} vendidos</span>
        </div>
      </li>
    `
}

async function showProducts () {
  const productsEndpoint = getProductsEndpoint()
  const productsData = await getProductsData(productsEndpoint)
  const { status, data } = productsData

  if (status === 'error') {
    ul.innerHTML += `<li class="ul__li">${data}</li>`
    return
  }

  const { catName, products } = data
  spanCategory.innerHTML += catName

  if (products.length === 0) {
    ul.innerHTML += '<li class="ul__li">No hay productos de esta categoría</li>'
    return
  }

  let delayAnimationTimeMs = 25
  products.forEach(product => {
    addProductToHtml(product, delayAnimationTimeMs)
    delayAnimationTimeMs += 25
  })
}

showProducts()
