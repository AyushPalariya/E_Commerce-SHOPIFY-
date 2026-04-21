document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const ordersContainer = document.getElementById("ordersContainer");
    
    try {
        if (!user.id) {
            ordersContainer.innerHTML = `<h5 class="text-danger">USER ID IS MISSING IN LOCALSTORAGE! Please logout and login again.</h5>`;
            return;
        }

        const response = await fetch(`http://localhost:8080/order/user-Order/${user.id}`);
        if (!response.ok) {
            let errText = await response.text();
            ordersContainer.innerHTML = `<h5 class="text-danger">Failed to fetch order history.<br>Target: /order/user-Order/${user.id}<br>Status: ${response.status}<br>Reply: ${errText}</h5>`;
            return;
        }

        const ordersText = await response.text();
        let orders;
        try {
            orders = JSON.parse(ordersText);
        } catch(e) {
            ordersContainer.innerHTML = `<h5 class="text-danger">JSON Parse Error. Backend sent: <br> ${ordersText}</h5>`;
            return;
        }

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="text-center my-5">
                    <i class="fa-solid fa-cart-arrow-down fa-3x text-muted mb-3" style="font-size: 50px;"></i>
                    <h5 class="text-muted">You haven't made any purchases yet! (Searched orders for User ID: ${user.id})</h5>
                    <a href="index.html" class="btn btn-warning mt-3 rounded-pill px-4">Start Shopping</a>
                </div>
            `;
            return;
        }

        let html = "";
        orders.forEach(order => {
            const date = new Date(order.orderDate).toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
            let statusDisplay = order.status;
            let badgeClass = 'badge-pending';
            if (statusDisplay && statusDisplay.toLowerCase() === 'completed') {
                badgeClass = 'badge-completed';
            }

            html += `
            <div class="order-card">
                <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                    <h5>Order Tracking: #SHP-${order.id}</h5>
                    <span class="badge ${badgeClass} fs-6">${statusDisplay || 'Confirmed'}</span>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <h6 class="mb-3" style="color: #ff9900af;">Items Purchased:</h6>
                        <ul class="list-unstyled">
                        ${order.orderItemDTO.map(item => `
                            <li class="mb-2"><i class="fa-solid fa-circle-check text-success me-2"></i> <strong class="text-white">${item.quantity}x</strong> <span class="text-white">${item.productName}</span> 
                            <span class="ms-2" style="color: #ffcc80;">(Rs. ${item.productPrice})</span></li>
                        `).join('')}
                        </ul>
                    </div>
                    <div class="col-md-4 text-md-end mt-3 mt-md-0 border-start border-secondary">
                        <p class="mb-1" style="color: #ff9900af;">Ordered On:</p>
                        <p class="mb-4 small text-white">${date}</p>
                        <h4 style="color: var(--primary-color);">Total: Rs. ${order.totalAmount}</h4>
                    </div>
                </div>
            </div>`;
        });
        
        ordersContainer.innerHTML = html;

    } catch (err) {
        console.error(err);
        ordersContainer.innerHTML = `<h5 class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Internal error connecting to the server.</h5>`;
    }
});
