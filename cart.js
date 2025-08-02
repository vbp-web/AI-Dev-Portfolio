document.addEventListener('DOMContentLoaded', () => {
    // This function will run as soon as the page is loaded
    loadCartItems();
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.querySelector('.cart-items-list');
    
    // Clear any existing content
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        // Display a message if the cart is empty
        cartItemsList.innerHTML = `
            <div class="cart-empty-message">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty.</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        // Hide the summary if the cart is empty
        document.querySelector('.cart-summary').style.display = 'none';
    } else {
        // Show the summary if there are items
        document.querySelector('.cart-summary').style.display = 'block';
        
        // Loop through each item in the cart and display it
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                </div>
                <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                <button class="remove-item-btn" onclick="removeItemFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsList.appendChild(cartItemElement);
        });
    }
    
    // Calculate and display totals
    updateCartTotals();
    // Also update the header counter
    updateCartCounter();
}

function removeItemFromCart(indexToRemove) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove the item at the specified index
    cart.splice(indexToRemove, 1);
    
    // Save the modified cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload the cart display to reflect the change
    loadCartItems();
}

function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Calculate taxes (e.g., 5%)
    const taxes = subtotal * 0.05;
    
    // Calculate total
    const total = subtotal + taxes;
    
    // Update the HTML elements
    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cart-taxes').textContent = `₹${taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('cart-total').textContent = `₹${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}