function setCatID (id) {
  localStorage.setItem('catID', id)
  window.location = 'products.html'
}

function sortAndShowCategories (sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray
  }

  currentCategoriesArray = sort(currentSortCriteria, currentCategoriesArray)

  // Muestro las categorías ordenadas
  showList()
}

// Función que se ejecuta una vez que se haya lanzado el evento de
// que el documento se encuentra cargado, es decir, se encuentran todos los
// elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentCategoriesArray = resultObj.data
      showList()
      // sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
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
    document.getElementById('rangeFilterCountMin').value = ''
    document.getElementById('rangeFilterCountMax').value = ''

    minCount = undefined
    maxCount = undefined

    showList()
  })

  document.getElementById('rangeFilterCount').addEventListener('click', function () {
    // Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    // de productos por categoría.
    minCount = document.getElementById('rangeFilterCountMin').value
    maxCount = document.getElementById('rangeFilterCountMax').value

    if ((minCount != undefined) && (minCount != '') && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount)
    } else {
      minCount = undefined
    }

    if ((maxCount != undefined) && (maxCount != '') && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount)
    } else {
      maxCount = undefined
    }

    showList()
  })
})
