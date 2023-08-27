const ORDER_ASC_BY_NAME = 'AZ'
const ORDER_DESC_BY_NAME = 'ZA'
const ORDER_BY_PROD_COUNT = 'Cant.'

function sort (criteria, array) {
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
      const aCount = parseInt(a.soldCount ? a.soldCount : a.productCount)
      const bCount = parseInt(b.soldCount ? b.soldCount : b.productCount)

      if (aCount > bCount) return -1
      if (aCount < bCount) return 1
      return 0
    })
  }

  return sortedArray
}
