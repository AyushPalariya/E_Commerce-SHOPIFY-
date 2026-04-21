document.addEventListener("DOMContentLoaded", async () => {
    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert("Invalid Product Specification!");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`);
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const product = await response.json();

        // Populate details
        document.getElementById("detailImg").src = product.imgUrl;
        document.getElementById("detailTitle").innerText = product.name;
        document.getElementById("detailPrice").innerText = `₹${product.price}`;
        document.getElementById("detailDesc").innerText = product.description;
        
        let cat = product.category || "General";
        document.getElementById("detailCategory").innerText = cat;
        document.getElementById("breadCategory").innerText = cat;
        document.getElementById("breadName").innerText = product.name;

        // Hook up buttons
        document.getElementById("detailAddToCart").addEventListener("click", () => {
            // Reusing addToCart logic from cart.js
            if(typeof addToCart === 'function'){
                addToCart(product.id, product.name, product.price, product.imgUrl);
                alert(`${product.name} added to cart!`);
            }
        });

        document.getElementById("detailBuyNow").addEventListener("click", () => {
            if(typeof addToCart === 'function'){
                addToCart(product.id, product.name, product.price, product.imgUrl);
                window.location.href = "cart.html";
            }
        });

        // Hide Spinner, Show Content
        document.getElementById("loadingSpinner").classList.add("d-none");
        document.getElementById("productDetailContainer").classList.remove("d-none");

    } catch (err) {
        console.error(err);
        document.getElementById("loadingSpinner").innerHTML = `<h5 class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Error Loading Product Data</h5><p>Make sure Backend is running!</p>`;
    }
});
