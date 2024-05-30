function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

async function confirmPurchase() {
    const params = getQueryParams();
    const response = await fetch('data.json');
    const data = await response.json();
    const product = data.products.find(p => p.name === params.product);

    if (product && product.stock > 0) {
        product.emails.push(params.email);
        product.stock -= 1;
        await fetch('update_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        alert('Purchase confirmed!');
        window.location.href = 'index.html';
    } else {
        alert('Purchase failed. Not enough stock.');
    }
}

window.onload = function() {
    const params = getQueryParams();
    const paymentInfoDiv = document.getElementById('payment-info');
    paymentInfoDiv.innerHTML = `<p>Product: ${params.product}</p><p>Email: ${params.email}</p><p>Remarks: ${params.remarks}</p>`;
};
