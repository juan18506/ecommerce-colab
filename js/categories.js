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
    let delayAnimationTimeMs = 25

    if (parseInt(productCount) >= minCount && parseInt(productCount) <= maxCount) {
      categoriesList.innerHTML += `
        <li class="ul__li ul__li--cat" onclick="setCatID(${id})" style="animation-delay: ${delayAnimationTimeMs}ms">
          <img class="ul__img" src=${imgSrc} alt="${name}">
          <div class="ul__div">
            <span class="ul__span ul__span--title">${name}</span>
            <span class="ul__span">${description}</span>
            <span class="ul__span ul__span--soldcount">${productCount} vendidos</span>
          </div>
        </li>
      `

      delayAnimationTimeMs += 25
    }
  })
}