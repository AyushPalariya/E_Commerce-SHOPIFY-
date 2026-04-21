const BASE_URL="http://localhost:8080";

async function loadProducts() {
    try{
        const res=await fetch(`${BASE_URL}/products`);
        const products=await res.json();
        
        const gadgestlist=document.getElementById("gadgest-products");
        const clothinglist=document.getElementById("clothing-products");
        const electroniclist=document.getElementById("electronic-products");
        gadgestlist.innerHTML="";
        clothinglist.innerHTML="";
        electroniclist.innerHTML="";
        products.forEach((product)=>{
            let productCard=`
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card h-100 product-card shadow-sm border border-secondary" style="background-color: var(--secondary-solor);">
                        <a href="productView.html?id=${product.id}" class="text-decoration-none text-light d-block p-0 text-center" style="color: inherit; cursor: pointer;">
                            <img src="${product.imgUrl}" alt="${product.name}" class="card-image-top mt-3 rounded" style="max-height:180px; object-fit: contain;">
                            <div class="card-body d-flex flex-column text-start pb-0">
                                <h5 class="card-title fw-bold text-white mb-1" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</h5>
                                <p class="card-text text-white-50 small mb-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 40px;">${product.description}</p>
                                <p class="price text-warning fs-5 mb-2"><strong>Rs. ${product.price}</strong></p>
                            </div>
                        </a>
                        <div class="card-footer bg-transparent border-0 px-3 pb-3 pt-0 mt-auto text-center" style="z-index: 2;">
                            <button class="btn btn-warning w-100 fw-bold rounded-pill" onclick="addToCart(${product.id},'${product.name}',${product.price},'${product.imgUrl}')">
                                <i class="fa-solid fa-cart-shopping me-1"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            if(product.category === "Clothing"){
                clothinglist.innerHTML+=productCard;
            }
            else if(product.category === "Electronics"){
                electroniclist.innerHTML+=productCard;
            }
            else{
                gadgestlist.innerHTML+=productCard;
            }
        });

        
    }
    catch(err){
        console.log("Error fetching Products",err);
    }

}

window.addEventListener("load", loadProducts);

// Search filter — only used on index.html
function filterProducts(query) {
    const q = query.toLowerCase().trim();
    // All product cards across all 3 sections
    const cards = document.querySelectorAll("#gadgest-products .col-lg-3, #clothing-products .col-lg-3, #electronic-products .col-lg-3");
    cards.forEach(card => {
        const title = card.querySelector(".card-title")?.innerText.toLowerCase() || "";
        const desc  = card.querySelector(".card-text")?.innerText.toLowerCase() || "";
        if (q === "" || title.includes(q) || desc.includes(q)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    // Also show/hide section headings if all cards in that section are hidden
    ["gadgest", "clothing", "electronic"].forEach(prefix => {
        const section = document.getElementById(`${prefix}-products`);
        const heading = document.getElementById(prefix === "gadgest" ? "gad" : prefix === "clothing" ? "clo" : "ele");
        if (!section || !heading) return;
        const visible = [...section.querySelectorAll(".col-lg-3")].some(c => c.style.display !== "none");
        heading.style.display = visible ? "" : "none";
    });
}