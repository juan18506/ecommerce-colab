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
			<div class="col-lg-2 col-4  border-bottom d-flex align-items-center pb-2">
				<img class="w-75" src="${image}" alt="${name}">
			</div>
			<div class="col-lg-3 col-4 border-bottom d-flex align-items-center">
				<p>${name}</p>
			</div>
			<div class="col-lg-2 col-4 border-bottom d-flex align-items-center">
				<p>${currency}<span class="cost">${unitCost}</span></p>
			</div>
			<div class="col-lg-2 col-5 border-bottom border-black d-flex align-items-center">
				<input type="number" name="cantidad" min="1" class="form-control w-75 cantidad mb-3" value="${count}">
			</div>
			<div class="col-lg-2 col-5 border-bottom border-black d-flex align-items-center">
				<p><strong>${currency}<span class="subtotal">${unitCost * count}</span></strong><p>
			</div>
			<div class="col-lg-1 col-2 border-bottom border-black d-flex align-items-center justify-content-center pb-3">
			    <i class="fas fa-trash-alt fa-lg delete-button" style="color: #cb1f23"></i>
			</div>
		`
	});

	updateCosts();
};

const updateCosts = () => {
	const subtotal = document.getElementById('precio');
	const shipment = document.getElementById('envio');
	const total = document.getElementById('total');

	let subPrice = 0;
	document.querySelectorAll('.subtotal').forEach((sub) => {
		subPrice += sub.parentElement.innerText.includes('UYU') ? +sub.innerText / 40 : +sub.innerText;
	});

	const premiumShipment = document.getElementById('premium');
	const expressShipment = document.getElementById('express');
	const standardShipment = document.getElementById('standard');

	let shipmentCost = 0;
	if (premiumShipment.checked) {
		shipmentCost = 0.15;
	} else if (expressShipment.checked) {
		shipmentCost = 0.07;
	} else if (standardShipment.checked) {
		shipmentCost = 0.05;
	}

	subtotal.innerText = Math.round(subPrice);
	shipment.innerText = Math.round(subPrice * shipmentCost);
	total.innerText = +subtotal.innerText + +shipment.innerText;
}

const radioInputs = () => {
	const creditRadio = document.getElementById('credit');
	const bankRadio = document.getElementById('bank');

	if (creditRadio.checked) {
		document.getElementById('card-number').disabled = false;
		document.getElementById('sec-number').disabled = false;
		document.getElementById('exp-date').disabled = false;
		document.getElementById('acc-number').disabled = true;
		document.getElementById('payment').innerText = 'Tarjeta de crédito';
	} else if (bankRadio.checked) {
		document.getElementById('card-number').disabled = true;
		document.getElementById('sec-number').disabled = true;
		document.getElementById('exp-date').disabled = true;
		document.getElementById('acc-number').disabled = false;
		document.getElementById('payment').innerText = 'Transferencia bancaria';


	};
};

document.addEventListener('DOMContentLoaded', async () => {
	const cartInfo = await getCartInfo()
	if (localStorage.getItem('cart') == "[]") {
		document.getElementById('articulos').innerHTML = '<h1 class="text-center"> El carrito está vacío </h1>'
	} else {
		showCartInfo(cartInfo);
	}

	const quantityInputs = document.querySelectorAll('.cantidad');
	const costSpans = document.querySelectorAll('.cost');
	const subtotalSpans = document.querySelectorAll('.subtotal');

	for (let i = 0; i < quantityInputs.length; i++) {
		const quantityInput = quantityInputs[i];
		const costSpan = costSpans[i];
		const subtotalSpan = subtotalSpans[i];

		quantityInput.addEventListener('change', () => {
			subtotalSpan.innerHTML = `${costSpan.innerHTML * quantityInput.value}`;

			const localCartInfo = JSON.parse(localStorage.getItem('cart'));
			localCartInfo[i] = {
				...localCartInfo[i],
				count: quantityInput.value,
			};

			localStorage.setItem('cart', JSON.stringify(localCartInfo));
			updateCosts();
		});
	}

	function removeCartProduct(event) {
		let products = JSON.parse(localStorage.getItem('cart'));
		let productName = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
		products = products.filter(product => product.name !== productName);
		localStorage.setItem('cart', JSON.stringify(products));
		location.reload();
	};

	const deleteButton = document.querySelectorAll('.delete-button');

	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', removeCartProduct);
	};

	document.querySelectorAll('input[type="radio"]').forEach((shipmentType) => {
		shipmentType.addEventListener('click', updateCosts);
	});

	document.querySelectorAll('input[name="payment-radio"]').forEach((btn) => {
		btn.addEventListener('change', radioInputs);
	})

});