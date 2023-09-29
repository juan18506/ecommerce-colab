const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json';
const PUBLISH_PRODUCT_URL = 'https://japceibal.github.io/emercado-api/sell/publish.json';
const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/';
const PRODUCT_INFO_COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/';
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';
const EXT_TYPE = '.json';

const showSpinner = () => document.getElementById('spinner-wrapper').style.display = 'block';
const hideSpinner = () => document.getElementById('spinner-wrapper').style.display = 'none';

const getJSONData = (url) => {
  const result = {};
  showSpinner();
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((res) => {
      result.status = 'ok';
      result.data = res;
      hideSpinner();
      return result;
    })
    .catch((error) => {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('user');
  if (!user) location.href = 'login.html';
  
  const profile = document.getElementById('profile');
  profile.textContent = user;

  const theme = localStorage.getItem('theme');
  if (theme === 'dark' && !document.body.classList.contains('index')) {
    document.body.classList.add('bg-dark', 'text-light');
  }

  document.getElementById('theme').addEventListener('click', () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    if (!document.body.classList.contains('index')) {
      document.body.classList.toggle('bg-dark');
      document.body.classList.toggle('text-light');
    }
  });
  
  document.getElementById('logout').addEventListener('click', () => localStorage.removeItem('user'));
});