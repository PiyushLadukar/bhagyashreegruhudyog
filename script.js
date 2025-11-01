// Products Data
const products = [
    { id: 1, name: "Wheat Flour", marathi: "गव्हाचं पीठ", image:"images/wheetflour.png"},
    { id: 2, name: "Jowar Flour", marathi: "ज्वारीचं पीठ", image:"images/jwari.png" },
    { id: 3, name: "Maize Flour", marathi: "मक्याचं पीठ", image:"images/makka.png" },
    { id: 4, name: "Ragi Flour", marathi: "नाचणीचं पीठ", image:"images/ragi.png" },
    { id: 5, name: "Bajra Flour", marathi: "बाजरीचं पीठ", image:"images/bajra.png" },
    { id: 6, name: "Mixed Flour", marathi: "मिश्र पीठ", image:"images/mixgrain.png" },
    { id: 7, name: "Rice Flour", marathi: "तांदळाचं पीठ", image:"images/riceflour.png" },
    { id: 8, name: "Gram Flour (Besan)", marathi: "बेसन", image:"images/gramflour.png" },
    { id: 9, name: "Wheat Semolina (Sooji)", marathi: "रवा/सुजी", image:"images/suji.png" },
    { id: 10, name: "Red Chili Powder", marathi: "भिवपुरी लाल मिरची",image:"images/chillepowder.png" },
    { id: 11, name: "Turmeric Powder", marathi: "हळद पावडर", image:"images/turmeric.png" },
    { id: 12, name: "Masala (Spice Mix)", marathi: "मसाला", image:"images/spicemix.png" },
    { id: 13, name: "Coriander Powder", marathi: "धने पावडर", image:"images/corienderpowder.png" },
    { id: 14, name: "Cumin Powder", marathi: "जिरं पावडर", image:"images/cumminpowder.png" },
    { id: 15, name: "Dhokla Mix Powder", marathi: "ढोकळा मिक्स", image:"images/Dhokla.png" },
    { id: 16, name: "Savji Masala", marathi: "सावजी मसाला", image:"images/saojimasala.png" },
    { id: 17, name: "Soybean Powder", marathi: "सोयाबीन पावडर", image:"images/soyabeen.png" }
];

let cart = [];

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-marathi hindi-font">${product.marathi}</p>
            <span class="price-label">Price on WhatsApp</span>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartBadge();
    showFloatingButton();
}

// Update Cart Badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// Show Floating Button
function showFloatingButton() {
    const button = document.getElementById('floatingWhatsApp');
    button.style.display = 'flex';
}

// Show Order Dialog
function showOrderDialog() {
    if (cart.length === 0) {
        alert('कृपया प्रथम उत्पादने जोडा!');
        return;
    }
    
    const dialog = document.getElementById('orderDialog');
    const dialogBody = document.getElementById('dialogCartItems');
    
    dialogBody.innerHTML = cart.map(item => `
    <div class="cart-item">
        <div class="cart-item-left">
            <img src="${item.image}" alt="${item.name}" 
                 style="width: 60px; height: 60px; border-radius: 8px; object-fit: contain; margin-right: 10px;">
            <span style="font-weight: 500;">${item.name}</span>
        </div>
        <span style="font-weight: 600;">${item.quantity} pack${item.quantity > 1 ? 's' : ''}</span>
    </div>
   `).join('');

    
    dialog.classList.add('open');
}

// Close Dialog
function closeDialog() {
    document.getElementById('orderDialog').classList.remove('open');
}

// Generate WhatsApp Message
function generateWhatsAppMessage() {
    if (cart.length === 0) {
        return 'https://wa.me/918668720984?text=नमस्कार! मला तुमच्या उत्पादनांबद्दल अधिक माहिती हवी आहे.';
    }

    let message = 'नमस्कार! मला खालील उत्पादने ऑर्डर करायची आहेत:\n\n';
    cart.forEach(item => {
        message += `${item.name} (${item.marathi}) - ${item.quantity} quantity\n`;
    });
    message += '\nकृपया किंमत आणि डिलिव्हरी माहिती द्या. धन्यवाद!';
    
    return 'https://wa.me/918668720984?text=' + encodeURIComponent(message);
}

// Confirm Order and Send to WhatsApp
function confirmOrder() {
    window.open(generateWhatsAppMessage(), '_blank');
    closeDialog();
}

// Floating WhatsApp Click - Now shows dialog first
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('floatingWhatsApp').addEventListener('click', function(e) {
        e.preventDefault();
        showOrderDialog();
    });

    renderProducts();
});
