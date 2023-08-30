const categoriesList = document.getElementById('cat-list-container')
const rangeFilterCountMin = document.getElementById('rangeFilterCountMin')
const rangeFilterCountMax = document.getElementById('rangeFilterCountMax')
let currentCategoriesArray = []
let currentSortCriteria
let minCount = 0
let maxCount = Infinity

getJSONData(CATEGORIES_URL).then(function (resultObj) {
  if (resultObj.status !== 'ok') return

  currentCategoriesArray = resultObj.data
  showCategoriesList()
  // sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
})

document.getElementById('sortAsc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC_BY_NAME)
})

document.getElementById('sortDesc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC_BY_NAME)
})

document.getElementById('sortByCount').addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_COUNT)
})

document.getElementById('clearRangeFilter').addEventListener('click', function () {
  rangeFilterCountMin.value = ''
  rangeFilterCountMax.value = ''

  minCount = 0
  maxCount = Infinity

  showCategoriesList()
})

document.getElementById('rangeFilterCount').addEventListener('click', function () {
  // Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  // de productos por categoría.
  minCount = rangeFilterCountMin.value
  maxCount = rangeFilterCountMax.value

  minCount = minCount && parseInt(minCount) >= 0 ? parseInt(minCount) : 0
  maxCount = maxCount && parseInt(maxCount) >= 0 ? parseInt(maxCount) : Infinity

  showCategoriesList()
})

function setCatID(id) {
  window.localStorage.setItem('catID', id)
  window.location = 'products.html'
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = categoriesArray ? categoriesArray : sortCriteria
  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray)
  // Muestro las categorías ordenadas
  showCategoriesList()
}

function showCategoriesList() {
  categoriesList.innerHTML = ''

  currentCategoriesArray.forEach((category) => {
    const { id, name, description, imgSrc, productCount } = category

    if (parseInt(productCount) >= minCount && parseInt(productCount) <= maxCount) {
      categoriesList.innerHTML += `
        <div onclick="setCatID(${id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
            <div class="col-3">
              <img src="${imgSrc}" alt="${description}" class="img-thumbnail">
            </div>
            <div class="col">
              <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${name}</h4>
                <small class="text-muted">${productCount} artículos</small>
              </div>
              <p class="mb-1">${description}</p>
            </div>
          </div>
        </div>
      `
    }
  })
}