const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json'
const PUBLISH_PRODUCT_URL = 'https://japceibal.github.io/emercado-api/sell/publish.json'
const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/'
const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/'
const PRODUCT_INFO_COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/'
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/'
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json'
const EXT_TYPE = '.json'

const showSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'block'
}

const hideSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'none'
}

const getJSONData = function (url) {
  const result = {}
  showSpinner()
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(function (response) {
      result.status = 'ok'
      result.data = response
      hideSpinner()
      return result
    })
    .catch(function (error) {
      result.status = 'error'
      result.data = error
      hideSpinner()
      return result
    })
}

const user = window.localStorage.getItem('user');
if (!user) window.location.href = 'login.html'

let profile = document.getElementById('profile');
profile.innerHTML = user
