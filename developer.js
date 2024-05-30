async function loadRecords() {
    const response = await fetch('data.json');
    const data = await response.json();
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = '';

    data.products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Stock: ${product.stock}</p>
            <h4>Emails:</h4>
            <ul>
                ${product.emails.map(email => `<li>${email}</li>`).join('')}
            </ul>
        `;
        recordList.appendChild(productItem);
    });
}

window.onload = loadRecords;
