const menuItems = [
    { id: 1, name: "Pizza", price: 10.99, image: "./pizza.jpg" },
    { id: 2, name: "Burger", price: 6.99, image: "./burger.jpeg" },
    { id: 3, name: "Pasta", price: 8.99, image: "./pasta.jpg" },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    displayMenu();
    updateCart();
});

function displayMenu() {
    const menuDiv = document.getElementById('menu-items');
    menuDiv.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        cart.push(item);
        updateCart();
    }
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartDiv.innerHTML = cart.length ? cart.map((item, index) => `
        <div class="cart-item">
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('') : '<p>Your cart is empty</p>';

    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

async function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/Case_study/placeOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart.map(({ name, price }) => ({ itemName: name, price })))
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        cart = [];
        updateCart();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to place order. Please try again.');
    }
}
