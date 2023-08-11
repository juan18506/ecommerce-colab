'use strict'

const AUTOS_ENDPOINT = 'https://japceibal.github.io/emercado-api/cats_products/101.json'
const ul = document.getElementById('products')

async function recuperarDatosDeAutos () {
  const res = await fetch(AUTOS_ENDPOINT)
  const data = await res.json()
  return data.products
}

recuperarDatosDeAutos()
  .then(autos => {
    autos.forEach(auto => {
      ul.innerHTML += `
        <li class="ul__li">
          <img class="ul__img" src=${auto.image} alt="Auto">
          <div class="ul__div">
            <span class="ul__span ul__span--title">${auto.name} - ${auto.cost} ${auto.currency}</span>
            <span class="ul__span">${auto.description}</span>
            <span class="ul__span ul__span--vendidos">${auto.soldCount} vendidos</span>
          </div>
        </li>
      `
    })
  })
