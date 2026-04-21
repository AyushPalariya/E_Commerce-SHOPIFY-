
const PAYMENT_BASE_URL = "http://localhost:8080/payment";
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
//getting from loacal storage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return; // Prevent crash on non-cart pages
    
    let totalAmount = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        cartItems.innerHTML += `
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
    let totalAmountElement = document.getElementById("total-amount");
    totalAmountElement.innerText = totalAmount;
}
//setting in local storage
let addToCart = (id, name, price, imgUrl) => {
    console.log("Adding to Cart", id, name, price, imgUrl);
    price = parseFloat(price);//convert into float
    let itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    }
    else {
        cart.push({
            id: id,
            name: name,
            price: price,
            imgUrl: imgUrl,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartcounter();
}

function updateCartcounter() {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    let badge = document.querySelector(".cart-badge");
    if (badge) {
        badge.innerText = currentCart.length;
    }
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartcounter();
}

window.addEventListener("load", updateCartcounter);
window.addEventListener("load", loadCart);


async function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let user = JSON.parse(localStorage.getItem("user"));

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!user) {
        alert("Please login to proceed to payment");
        window.location.href = "login.html";
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let orderItemDTO = cart.map(item => ({
        productName: item.name,
        productPrice: item.price,
        quantity: item.quantity
    }));

    let orderDetails = {
        amount: totalAmount,
        name: user.name,
        email: user.email,
        phone: user.phone || "0000000000",
        totalAmount: totalAmount,
        orderItemDTO: orderItemDTO
    };

    try {
        const createRes = await fetch(PAYMENT_BASE_URL + "/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        });

        if (!createRes.ok) {
            let errorText = await createRes.text();
            alert("Failed to create order. Backend Status: " + createRes.status + ", Reply: " + errorText);
            return;
        }

        const orderResText = await createRes.text();
        let razorpayOrderId = orderResText;
        try {
            let parsed = JSON.parse(orderResText);
            if (parsed.id) razorpayOrderId = parsed.id;
        } catch (e) { }

        const options = {
            "key": "rzp_test_Sg1c47mJQEXgXj", // IMPORTANT: Put your actual Razorpay key here
            "amount": totalAmount * 100, // amount in paisa
            "currency": "INR",
            "name": "SHOPIFY",
            "description": "Order Payment",
            "order_id": razorpayOrderId,
            "handler": async function (response) {
                let orderDTO = {
                    username: user.name,
                    email: user.email,
                    totalAmount: totalAmount,
                    status: "Completed",
                    orderItemDTO: orderItemDTO
                };

                const updateUrl = new URL(PAYMENT_BASE_URL + "/update-order");
                updateUrl.searchParams.append("paymentId", response.razorpay_payment_id);
                updateUrl.searchParams.append("orderId", response.razorpay_order_id);
                updateUrl.searchParams.append("status", "Confirmed");

                try {
                    const updateRes = await fetch(updateUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(orderDTO)
                    });

                    if (updateRes.ok) {
                        // Place order physically in the system so it appears on My Orders
                        let productQuantities = {};
                        cart.forEach(item => {
                            productQuantities[item.id] = item.quantity;
                        });
                        await fetch(`http://localhost:8080/order/place/${user.id}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                productQuantities: productQuantities,
                                totalAmount: totalAmount
                            })
                        });

                        alert("Payment successful!");
                        localStorage.removeItem("cart");
                        sessionStorage.setItem("lastOrder", JSON.stringify(orderDTO));
                        window.location.href = "orderDetail.html";
                    } else {
                        alert("Payment updating failed backend.");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error updating order status in database.");
                }
            },
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": user.phone || ""
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert("Payment failed: " + response.error.description);
        });
        rzp1.open();

    } catch (err) {
        console.error(err);
        alert("Error during payment processing. Details: " + err.message);
    }
}

