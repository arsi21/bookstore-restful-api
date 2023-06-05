const tokenData = JSON.parse(sessionStorage.getItem('tokenData'));
const token = tokenData.token;
const orderData = JSON.parse(sessionStorage.getItem('orderData'));
const orderId = orderData.orderId;
const container = document.querySelector('#container');
const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
);

updateOrder();

async function updateOrder() {
    await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            clientSecret: clientSecret,
            paid: true
        }),
    });

    sessionStorage.removeItem('orderData');
    container.innerHTML = "<h1>Payment succeeded!</h1>"
};