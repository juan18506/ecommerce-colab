const authenticate = async () => {
	const res = await fetch(LOGIN_URL, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			'charset': 'utf-8',
		},
		body: JSON.stringify({
			username: 'admin',
			password: 'admin'
		}),
	});

	const { token } = await res.json();
	return token;
}

const getCartInfo = async (accessToken) => {
	const res = await fetch(`${CART_INFO_URL}`, {
		method: 'GET',
		headers: { 'access-token': accessToken }
	});

	const cartInfo = await res.json()
	return cartInfo;
};

const getProductByName = async (productName, accessToken) => {
	const res = await fetch(`${CART_INFO_URL}/${productName}`, {
		method: 'GET',
		headers: { 'access-token': accessToken }
	});

	const product = await res.json();
	return product;
}

const showCartInfo = (cartInfo) => {
	const cartSection = document.getElementById('cart-section');

	cartInfo.forEach(product => {
		const { name, unitCost, currency, image, count } = product;

		cartSection.innerHTML += `
			<div class="col-lg-2 col-4  border-bottom d-flex align-items-center pb-2">
				<img class="w-75" src="${image}" alt="${name}">
			</div>
			<div class="col-lg-3 col-4 border-bottom d-flex align-items-center">
				<p class="productName">${name}</p>
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

	document.getElementById('card-number').disabled = creditRadio.checked ? false : true;
	document.getElementById('sec-number').disabled  = creditRadio.checked ? false : true;
	document.getElementById('exp-date').disabled    = creditRadio.checked ? false : true;
	document.getElementById('acc-number').disabled  = creditRadio.checked ? true : false;
	document.getElementById('payment').innerText    = creditRadio.checked ? 'Tarjeta de crédito' : 'Transferencia bancaria';

	return document.getElementById('payment').innerText;
};

const checkPaymentValidity = (paymentForm) => {
	let isValid = true;

	switch (paymentForm) {
		case 'Tarjeta de crédito':
			const creditCardInfo = document.getElementById('credit-card-info');
			creditCardInfo.querySelectorAll('input').forEach((input) => {
				if (input.value === '') isValid = false;
			});
		break;

		case 'Transferencia bancaria':
			const bankInfo = document.getElementById('bank-info');
			bankInfo.querySelectorAll('input').forEach((input) => {
				if (input.value === '') isValid = false;
			});
		break;
	
		default:
			isValid = false;
	}

	return isValid;
}

const handlePayment = (formSubmitted) => {
	const paymentForm = radioInputs();
	if (!formSubmitted) return;

	document.getElementById('labelterm').hidden = checkPaymentValidity(paymentForm);
}

document.addEventListener('DOMContentLoaded', async () => {
	const accessToken = await authenticate();

	const cartInfo = await getCartInfo(accessToken);
	if (cartInfo === "[]") {
		document.getElementById('articulos').innerHTML = '<h1 class="text-center"> El carrito está vacío </h1>'
	} else {
		showCartInfo(cartInfo);
	}

	const quantityInputs = document.querySelectorAll('.cantidad');
	const costSpans = document.querySelectorAll('.cost');
	const subtotalSpans = document.querySelectorAll('.subtotal');
	const nameSpans = document.querySelectorAll('.productName');

	for (let i = 0; i < quantityInputs.length; i++) {
		const quantityInput = quantityInputs[i];
		const costSpan = costSpans[i];
		const subtotalSpan = subtotalSpans[i];
		const nameSpan = nameSpans[i];

		quantityInput.addEventListener('change', async () => {
			if (quantityInput.value < 1) quantityInput.value = 1;

			subtotalSpan.innerHTML = `${costSpan.innerHTML * quantityInput.value}`;

			const productName = nameSpan.innerText;
			const { id } = await getProductByName(productName, accessToken);

			const updateCountResponse = await fetch(`${CART_INFO_URL}/${id}`, {
				method: 'PATCH',
				headers: { 
					'Content-Type': 'application/json',
					'charset': 'utf-8',
					'access-token': accessToken,
				},
				body: JSON.stringify({
					count: quantityInput.value,
				}),
			})
			
			updateCosts();
		});
	}

	const removeCartProduct = async (event) => {
		const productName = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
		const { id } = await getProductByName(productName, accessToken);

		const removeProductResponse = await fetch(`${CART_INFO_URL}/${id}`, {
			method: 'DELETE',
			headers: { 'access-token': accessToken }
		});

		location.reload();
	};

	const deleteButton = document.querySelectorAll('.delete-button');

	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', removeCartProduct);
	};

	document.querySelectorAll('.form-check-input').forEach((shipmentType) => {
		shipmentType.addEventListener('click', updateCosts);
	});

	const form = document.getElementById('form');
	const payment = document.getElementById('payment');
	let formSubmitted = false;

	form.addEventListener('submit', (e) => {
		if (!form.checkValidity()) {
			e.preventDefault();
		  e.stopPropagation();
		} else {
			document.getElementById('alert').classList.add('show');
		}

		form.classList.add('was-validated');
		formSubmitted = true;

		document.getElementById('labelterm').hidden = checkPaymentValidity(payment.innerText);

	});

	document.querySelectorAll('.payment').forEach((paymentCheckbox) => {
		paymentCheckbox.addEventListener('click', () => handlePayment(formSubmitted));
	});

	const paymentTextInputs = [
		...document.getElementById('credit-card-info').querySelectorAll('input[type="text"]'),
		...document.getElementById('bank-info').querySelectorAll('input[type="text"]')
	];

	paymentTextInputs.forEach((input) => {
		input.addEventListener('input', () => handlePayment(formSubmitted));
	});
});