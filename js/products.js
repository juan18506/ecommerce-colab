'use strict'

const AUTOS_ENDPOINT = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

async function recuperarDatosDeAutos () {
  const res = await fetch(AUTOS_ENDPOINT)
  const data = await res.json()
  return data.products
}

const dataAutos = await recuperarDatosDeAutos()

const ul = document.getElementById('products')

dataAutos.forEach(auto => {
  ul.innerHTML += `
    <li class="ul__li">
      <div class="ul__div">
        <p class="ul__p">${auto.name} - ${auto.cost} ${auto.currency}</p>
        <p class="ul__p">${auto.description}</p>
        <p class="ul__p">${auto.soldCount} vendidos</p>
      </div>
      <img class="ul__img" src=${auto.image} alt="Auto">
    </li>
  `
})