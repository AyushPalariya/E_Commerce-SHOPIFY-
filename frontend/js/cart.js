
let cart=JSON.parse(localStorage.getItem("cart")) ?? [];
//getting from loacal storage
function loadCart(){
    let cart=JSON.parse(localStorage.getItem("cart")) ?? [];
    const cartItems=document.getElementById("cart-items");
    let totalAmount=0;
    cartItems.innerHTML="";

    cart.forEach((item,index) => {
        let itemTotal=item.price * item.quantity;
        totalAmount+=itemTotal;

        cartItems.innerHTML+=`
        <tr>
            <td><img src="${item.imgUrl}" width="50" alt="Random"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index},-1)">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index},+1)">+</button>
            </td>
            <td>Rs. ${itemTotal}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="changeQuantity(${index},-${item.quantity})">x</button>
            </td>
        </tr>
        `;
    });
    let totalAmountElement=document.getElementById("total-amount");
    totalAmountElement.innerText=totalAmount;
}
//setting in local storage
let addToCart=(id,name,price,imgUrl)=>{
    console.log("Adding to Cart",id,name,price,imgUrl);
    price=parseFloat(price);//convert into float
    let itemIndex=cart.findIndex((item)=>item.id===id);
    if(itemIndex > -1){
        cart[itemIndex].quantity++;
    }
    else{
        cart.push({
            id:id,
            name:name,
            price:price,
            imgUrl:imgUrl,
            quantity:1
        });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartcounter();
}

function updateCartcounter(){
    document.querySelector(".cart-badge").innerText=cart.length;
}

function changeQuantity(index,change){
    let cart=JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity+=change;
    if(cart[index].quantity<=0){
        cart.splice(index,1);
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
    updateCartcounter();
}

window.addEventListener("load",updateCartcounter);
window.addEventListener("load",loadCart);