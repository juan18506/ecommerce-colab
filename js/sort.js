const ORDER_ASC_BY_NAME = 'AZ'
const ORDER_DESC_BY_NAME = 'ZA'
const ORDER_BY_PROD_COUNT = 'Cant.'
let currentCategoriesArray = []
let currentSortCriteria
let minCount
let maxCount

function sort (criteria, array, product) {
  let sortedArray = []
  
  if (criteria === ORDER_ASC_BY_NAME) {
    sortedArray = array.sort(function (a, b) {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  } else if (criteria === ORDER_DESC_BY_NAME) {
    sortedArray = array.sort(function (a, b) {
      if (a.name > b.name) return -1
      if (a.name < b.name) return 1
      return 0
    })
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    sortedArray = array.sort(function (a, b) {
      const aCount = parseInt(product ? a.soldCount : a.productCount)
      const bCount = parseInt(product ? b.soldCount : b.productCount)

      if (aCount > bCount) return -1
      if (aCount < bCount) return 1
      return 0
    })
  }

  return sortedArray
}

function showList (products) {
  let htmlContentToAppend = ''

  for (let i = 0; i < currentCategoriesArray.length; i++) {
    const category = currentCategoriesArray[i]

    if (((minCount == undefined) || parseInt(category.productCount) >= minCount) && ((maxCount == undefined) || parseInt(category.productCount) <= maxCount)) {
      htmlContentToAppend += `
            <li ${products ? 'hola' : onclick=`setCatID(${category.id})`} class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </li>
            `
    }

    document.getElementById('cat-list-container').innerHTML = htmlContentToAppend
  }
}