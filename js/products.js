'use strict'

const productList = document.getElementById('products')
const categoryText = document.getElementById('category')
const rangeFilterCountMin = document.getElementById('rangeFilterCountMin')
const rangeFilterCountMax = document.getElementById('rangeFilterCountMax')
const inputSearch = document.getElementById('search')
const productsEndpoint = getProductsEndpoint()
let currentProductsArray = null
let filteredArray = null
let minCost = 0
let maxCost = Infinity

getProductsData(productsEndpoint)
  .then(productsData => showProducts(productsData))

document.getElementById('sortAsc').addEventListener('click', () => sortAndShowProducts(ORDER_ASC_BY_COST))
document.getElementById('sortDesc').addEventListener('click', () => sortAndShowProducts(ORDER_DESC_BY_COST))
document.getElementById('sortByCount').addEventListener('click', () => sortAndShowProducts(ORDER_BY_PROD_COUNT))
document.getElementById('clearRangeFilter').addEventListener('click', () => {
  rangeFilterCountMin.value = ''
  rangeFilterCountMax.value = ''
  inputSearch.value = ''
  filteredArray = null

  minCost = 0
  maxCost = Infinity

  sortAndShowProducts(ORDER_BY_FILTER)
})
document.getElementById('rangeFilterCount').addEventListener('click', function () {
  minCost = rangeFilterCountMin.value
  maxCost = rangeFilterCountMax.value

  minCost = minCost && parseInt(minCost) >= 0 ? parseInt(minCost) : 0
  maxCost = maxCost && parseInt(maxCost) >= 0 ? parseInt(maxCost) : Infinity

  sortAndShowProducts(ORDER_BY_FILTER)
})
inputSearch.addEventListener('input', () => {
  if (!currentProductsArray) return
  const query = inputSearch.value.toLowerCase()
  
  filteredArray = currentProductsArray.filter((el) => {
    let { name, description } = el
    name = name.toLowerCase()
    description = description.toLowerCase()

    return name.includes(query) || description.includes(query)
  })

  sortAndShowProducts(ORDER_BY_FILTER)
})

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
  
  if (parseInt(cost) < minCost || parseInt(cost) > maxCost) return
  productList.innerHTML += `
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
  const sortedProducts = filteredArray ? sortProducts(criteria, filteredArray) : sortProducts(criteria, currentProductsArray)

  let delayAnimationTimeMs = 25
  sortedProducts.forEach((product) => {
    addProductToHtml(product, delayAnimationTimeMs)
    delayAnimationTimeMs += 25 
  })
}