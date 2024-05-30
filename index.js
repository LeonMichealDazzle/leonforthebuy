async function loadProducts() {
    const response = await fetch('data.json');
    const data = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    data.products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price}元</p>
            <p>Stock: ${product.stock}</p>
            <input type="email" class="email" placeholder="Enter your email here" required>
            <textarea class="remarks" placeholder="Add your remarks here"></textarea>
            <button class="buy-button" onclick="buyNow('${product.name}', this)">Buy Now</button>
        `;
        productList.appendChild(productItem);
    });
}

async function buyNow(productName, button) {
    const emailInput = button.previousElementSibling.previousElementSibling;
    const remarksInput = button.previousElementSibling;
    const email = emailInput.value;
    const remarks = remarksInput.value;

    if (!email) {
        alert('Please enter your email before purchasing.');
        return;
    }

    const response = await fetch('data.json');
    const data = await response.json();
    const product = data.products.find(p => p.name === productName);

    if (product && product.stock > 0) {
        product.emails.push(email);
        product.stock -= 1;
        await fetch('update_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        alert('Purchase successful!');
        loadProducts();
    } else {
        alert('Purchase failed. Not enough stock.');
    }
}

window.onload = loadProducts;
