/**
 * Author: Donald Wolfson
 * Date: 02/09/2021
 */
window.addEventListener('DOMContentLoaded', () => {
    // First get any of the ID's in local storage.
    keys = Object.keys(localStorage);
    shopping_cart = []
    for (let i = 0; i <= keys.length; i++) {
        if (keys[i] != "data") {
            shopping_cart.push(keys[i]);
        }
    }

    // Edge Case: Add data from API if not already mapped to localstorage.
    if (localStorage.getItem("data") == null) {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => localStorage.setItem("data", JSON.stringify(data)));
    }
    // Grab necessary values:
    api_data = JSON.parse(localStorage.getItem("data"));
    parent = document.getElementById("product-list");
    cart_count = parseInt(document.getElementById("cart-count").innerHTML);

    // Iterate over each element and make a HTML element for them.
    let index = 0;
    api_data.forEach(element => {
        id = "index-" + index;
        if (shopping_cart.includes(id)) {
            parent.appendChild(new ProductItem(element, index, 1));
            document.getElementById("cart-count").innerHTML = ++cart_count;
        } else {
            parent.appendChild(new ProductItem(element, index, 0));
        }
        index++;
    })
});

function decrement_count(id) {
    // localStorage:
    localStorage.removeItem(id);

    // HTML decrement:
    cart_count = parseInt(document.getElementById("cart-count").innerHTML);
    document.getElementById("cart-count").innerHTML = cart_count - 1;
}

function incremenet_count(id) {
    // localStorage:
    localStorage.setItem(id, id.toString());

    // HTML increment.
    cart_count = parseInt(document.getElementById("cart-count").innerHTML);
    document.getElementById("cart-count").innerHTML = cart_count + 1;
}