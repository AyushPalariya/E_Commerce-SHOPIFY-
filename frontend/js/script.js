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
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card h-100">
                        <img src="${product.imgUrl}" alt="${product.name} class="card-image-top">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="price"><strong>Rs.${product.price}</strong></p>
                            <button class="btn btn-primary mt-auto"
                            onclick="addToCart(${product.id},'${product.name}',${product.price},'${product.imgUrl}')">
                            Add to Cart
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


window.addEventListener("load",loadProducts);