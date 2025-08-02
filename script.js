document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});

// Updates the cart counter on the page
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counterElements = document.querySelectorAll('.cart-counter');
    counterElements.forEach(el => {
        el.textContent = cart.length;
    });
}

// Shows a toast notification
function showToast(message) {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
    
    container.appendChild(toast);
    
    // The toast will be removed by the CSS animation ending, but as a fallback:
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Adds an item to the cart in localStorage
function addToCart(name, price, image) {
    // 1. Get the current cart from localStorage or create a new one
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. Add the new product
    cart.push({ name, price, image });
    
    // 3. Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 4. Give user feedback
    showToast(`${name} added to cart!`);
    
    // 5. Update the visual counter
    updateCartCounter();
}