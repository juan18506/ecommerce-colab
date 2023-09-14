# ecommerce-colab

## Dividir:

- mostrar el funcionamiento de la pagina
  - nombre en navbar post login
  - productos dependiendo setID
  - filtros | busqueda y limpiar
  - normalizados estilos de productos-categorias
  - responsive productos
- nombre de usuario en navbar
- mostrar productos dependiendo setID (localStorage) (products.js - getProductsEndpoint())
- función sortProducts() (sort.js)
- addEventListeners filtros y variables currentProductsArray - minCost - maxCost (products.js)
- función sortAndShowProducts() (products.js)
- desafiate (products.js)

## Integrantes:

- Juan Alves Pedreira
  - función sortAndShowProducts() (products.js)
- Giuliana Manzi
  - mostrar productos dependiendo setID
- Lua Lemes
  - función sortProducts() (sort.js)
- Matías Quiroga
  - desafiate (products.js)
- Micaela Belen Olivera
  - mostrar el funcionamiento de la pagina
- Santiago Delelli
  - nombre de usuario en navbar
- Valentina Butrico
  - addEventListeners filtros y variables currentProductsArray - minCost - maxCost (products.js)


    let asd = ''
    for (let i = 0; i < 5; i++) {
      const color = (score > i) ? 'style="color: #febf01;' : 'style="color: #c0c0c0;"';

      asd += `
        <i class="fas fa-star" ${ color }></i>
      `;
    }

    <span>${ asd }</span>