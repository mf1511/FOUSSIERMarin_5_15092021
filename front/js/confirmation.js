const urlParams = new URL(window.location);
const idUrl = urlParams.searchParams.get('orderId');

const validation = document.getElementById("orderId");

validation.innerHTML = idUrl;
