const ORDER_ASC_BY_NAME = 'AZ'
const ORDER_DESC_BY_NAME = 'ZA'
const ORDER_BY_PROD_COUNT = 'Cant.'
const ORDER_ASC_BY_COST = '0..9'
const ORDER_DESC_BY_COST = '9..0'
const ORDER_BY_FILTER = 'Min-Max'

function sortCategories (criteria, array) {
  if (criteria === ORDER_ASC_BY_NAME) {
    return array.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
  
  if (criteria === ORDER_DESC_BY_NAME) {
    return array.sort((a, b) => {
      if (a.name > b.name) return -1
      if (a.name < b.name) return 1
      return 0
    })
  }
  
  if (criteria === ORDER_BY_PROD_COUNT) {
    return array.sort((a, b) => b.productCount - a.productCount)
  }
}

function sortProducts (criteria, array) {
  if (criteria === ORDER_ASC_BY_COST) {
    return array.sort((a, b) => a.cost - b.cost)
  } 
  
  if (criteria === ORDER_DESC_BY_COST) {
    return array.sort((a, b) => b.cost - a.cost)
  }
  
  if (criteria === ORDER_BY_PROD_COUNT) {
    return array.sort((a, b) => b.soldCount - a.soldCount)
  }

  return array
}
