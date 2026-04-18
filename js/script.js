// --- 1. Product Data ---
const products = [
    {
        id: 1,
        title: "Invisible Ink Pen",
        description: "Write your secrets down! Disclaimer: Never becomes visible again.",
        price: "$18.99",
        rating: "★★★★★",
        badgeText: "Add to Cart",
        image: "img/invisibleink.avif" 
    },
    {
        id: 2,
        title: "Dehydrated Water",
        description: "Just add water to experience the freshest water ever created.",
        price: "$16.99",
        rating: "★★★★☆",
        badgeText: "Best Seller",
        image: "img/emptyglass.jpg"
    },
    {
        id: 3,
        title: "Left-Handed Mug",
        description: "Specifically engineered for left hands. Right hands will spill immediately.",
        price: "$17.99",
        rating: "★★★★★",
        badgeText: "New Arrival",
        image: "img/leftmag.webp"
    },
    {
        id: 4,
        title: "You Can't Buy This",
        description: "A literal paradox. Clicking the button below violates the laws of physics.",
        price: "$99.99",
        rating: "★★★★★",
        badgeText: "Try It",
        image: "" // Kept blank to add to the joke!
    },
    {
        id: 5,
        title: "Delete The Page",
        description: "Warning: Adding this to your cart deletes the entire universe.",
        price: "$0.00",
        rating: "★☆☆☆☆",
        badgeText: "DO NOT CLICK",
        // Fixed Image: A retro glitch screen
        image: "img/deletepage.avif"
    },
    {
        id: 6,
        title: "Wireless Cable",
        description: "10 feet of premium 100% wireless cable. Zero tangles guaranteed.",
        price: "$24.99",
        rating: "★★★★☆",
        badgeText: "Wire to Cart",
        image: "img/wireless.avif"
    },
    {
        id: 7,
        title: "Blinker Fluid",
        description: "Keep your car's turn signals flashing brightly. Premium synthetic blend.",
        price: "$12.99",
        rating: "★★★★★",
        badgeText: "Add to Cart",
        // Fixed Image: Mysterious glowing fluid bottle
        image: "img/blinker.jpg"
    },
    {
        id: 8,
        title: "Round Tuit",
        description: "Finally, you can get around to doing all those chores. A genuine Round Tuit.",
        price: "$8.99",
        rating: "★★★☆☆",
        badgeText: "Add to Cart",
        // Fixed Image: A circular metallic object
        image: "img/chaos.avif"
    },
    {
        id: 9,
        title: "Elbow Grease",
        description: "Pure, concentrated elbow grease. Apply directly to difficult tasks.",
        price: "$15.99",
        rating: "★★★★☆",
        badgeText: "Add to Cart",
        image: "img/elbow.avif"
    }
];

// --- 2. Render Cards ---
const gridContainer = document.getElementById('card-grid');

// Custom logic to handle the missing image for Item 4 beautifully 
gridContainer.innerHTML = products.map(product => `
    <div class="card">
        <div class="card-image-wrapper" ${!product.image ? 'style="background: #110e0c; display: flex; align-items: center; justify-content: center;"' : ''}>
            ${product.image ? `<img src="${product.image}" alt="${product.title}" class="card-image">` : `<span style="color: #666; font-style: italic;">(Image redacted for safety)</span>`}
            <button class="card-badge add-to-cart-btn" data-id="${product.id}">${product.badgeText}</button>
        </div>
        <div class="card-content">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-desc">${product.description}</p>
            <div class="card-footer">
                <span class="price">${product.price}</span>
                <span class="rating">${product.rating}</span>
            </div>
        </div>
    </div>
`).join('');


// --- 3. MAGIC LOGIC FOR NEW CARDS ---

// The "You Can't Buy This" Runaway Button (Item ID: 4)
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('add-to-cart-btn') && e.target.getAttribute('data-id') === "4") {
        const btn = e.target;
        
        const randomX = Math.floor(Math.random() * -100) - 50; 
        const randomY = Math.floor(Math.random() * -100) - 50;
        
        btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Extended timer to 5 seconds
        setTimeout(() => {
            btn.style.transform = '';
        }, 5000);
    }
});


// --- 4. Main Sign In Button Runaway Logic ---
const signInBtn = document.getElementById('signin-btn');
let runawayTimeout;

signInBtn.addEventListener('click', () => {
    if (signInBtn.classList.contains('runaway')) {
        signInBtn.classList.remove('runaway');
        clearTimeout(runawayTimeout); 
    } else {
        signInBtn.classList.add('runaway');
        clearTimeout(runawayTimeout);
        runawayTimeout = setTimeout(() => {
            signInBtn.classList.remove('runaway');
        }, 3000);
    }
});


// --- 5. Cart Logic & Delete Page Blackout ---
let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const blackoutScreen = document.getElementById('blackout-screen'); 

document.getElementById('cart-btn').addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
});

document.getElementById('close-cart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
}

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        
        
        if (productId === 5) {
            blackoutScreen.classList.add('active');
            setTimeout(() => {
                blackoutScreen.classList.remove('active');
            }, 3000);
            return; 
        }

        
        if (productId === 4) {
            alert("Wait, how did you even catch that button?! 🤨 Regardless, you still can't buy it. It violates the laws of physics.");
            return; 
        }

        const productToAdd = products.find(p => p.id === productId);
        cart.push(productToAdd);
        updateCartUI();
        
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
    });
});

function updateCartUI() {
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <span class="price" style="font-size: 0.9rem;">${item.price}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
        </div>
    `).join('');
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};


// --- 6. TROLL FOOTER LOGIC ---

document.getElementById('troll-ig').addEventListener('click', () => {
    alert("you didnt really think we have instagram account , right ? 🌚");
});

const jokeModal = document.getElementById('joke-modal');
const closeJokeBtn = document.querySelector('.close-joke');

document.getElementById('troll-fb').addEventListener('click', () => {
    jokeModal.classList.add('show');
});

closeJokeBtn.addEventListener('click', () => {
    jokeModal.classList.remove('show');
});

jokeModal.addEventListener('click', (e) => {
    if (e.target === jokeModal) {
        jokeModal.classList.remove('show');
    }
});

document.getElementById('troll-tg').addEventListener('click', () => {
   
});