const getCartInfo = async () => {
    const { data } = await getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`);
    const articles = data.articles;
    return articles;
};

const showCartInfo = async (cartInfo) => {
    const cartSection = document.getElementById('cart-section');

    cartInfo.forEach(product => {
        const { name, unitCost, currency, image, count } = product;
        
        cartSection.innerHTML += `
            <div class="col-md-2">
                <img class="w-75" src="${ image }" alt="${ name }">
            </div>
            <div class="col-md-2">
                <p>${ name }</p>
            </div>
            <div class="col-md-2">
                <p>${ currency }${ unitCost }</p>
            </div>
            <div class="col-md-2">
                <input type="number" name="cantidad" class="form-control w-50 cantidad" value="${ count }">
            </div>
            <div class="col-md-2">
                <p class="subtotal"><strong>${ currency }${ unitCost * count }</strong><p>
            </div>
            <div class="col-md-2"></div>
        `
    });

};

document.addEventListener('DOMContentLoaded', () => {
    getCartInfo()
        .then(cartInfo => showCartInfo(cartInfo));
});