const getCartInfo = async () => {
	if (!localStorage.getItem('cart')) {
		const { data } = await getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`);
    const articles = data.articles;
		console.log(articles);
    localStorage.setItem('cart', JSON.stringify(articles));
	}

	return JSON.parse(localStorage.getItem('cart'));
};

const showCartInfo = (cartInfo) => {
	const cartSection = document.getElementById('cart-section');

	cartInfo.forEach(product => {
		const { name, unitCost, currency, image, count } = product;

		cartSection.innerHTML += `
			<div class="col-md-2">
				<img class="w-75" src="${image}" alt="${name}">
			</div>
			<div class="col-md-2">
				<p>${name}</p>
			</div>
			<div class="col-md-2">
				<p>${currency}<span class="cost">${unitCost}</span></p>
			</div>
			<div class="col-md-2">
				<input type="number" name="cantidad" class="form-control w-50 cantidad" value="${count}">
			</div>
			<div class="col-md-2">
				<p><strong>${currency}<span class="subtotal">${unitCost * count}</span></strong><p>
			</div>
			<div class="col-md-2"></div>
		`
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const cartInfo = await getCartInfo()
	showCartInfo(cartInfo);

	const quantityInputs = document.querySelectorAll('.cantidad');
	const costSpans = document.querySelectorAll('.cost');
	const subtotalSpans = document.querySelectorAll('.subtotal');

	for (let i = 0; i < quantityInputs.length; i++) {
		const quantityInput = quantityInputs[i];
		const costSpan = costSpans[i];
		const subtotalSpan = subtotalSpans[i];
		
		quantityInput.addEventListener('change', () => {
			subtotalSpan.innerHTML = `${ costSpan.innerHTML * quantityInput.value }`;

			const localCartInfo = JSON.parse(localStorage.getItem('cart'));
			localCartInfo[i] = {
				...localCartInfo[i],
				count: quantityInput.value,
			};

			localStorage.setItem('cart', JSON.stringify(localCartInfo));
		});
	}
});