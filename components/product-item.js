/**
 * Author: Donald Wolfson
 * Date: 02/09/2021
 */
class ProductItem extends HTMLElement {
    // Class Constructor;
    constructor(json_data, index, in_cart) {
        super();

        // Template CSS.
        let template = document.createElement("template");
        template.innerHTML = `
<style>
    .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
    }
    
    .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
    }
    
    .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
    }
    
    .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
    }
    
    .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
    }
    
    .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
    }
</style>
<li class="product">
    <img src="${json_data["image"]}", width=200></img>
    <p class="title">${json_data["title"]}</p>
    <p class="price">${json_data["price"]}</p>
    <button class="cart_button">Add to Cart</button>
</li>`;
        // Root stuff.
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));

        // Button related processes:      
        this.button = this.root.querySelector(".cart_button");
        this.button.setAttribute("cartboolean", in_cart);
        id = "index-" + index;
        this.button.setAttribute("id", id);

        // Update HTML if already in cart.
        if (in_cart) {
            this.button.innerHTML = "Remove from Cart";
        }

        // Handle button clicking for cart.
        this.button.onclick = function() {
            if (parseInt(this.getAttribute("cartboolean")) == 1) {
                this.setAttribute("cartboolean", 0);
                this.innerHTML = "Add to Cart";
                decrement_count(this.getAttribute("id"));
            } else {
                // Edge Case: Don't do anything if already in cart.
                id = this.getAttribute("id");
                if (Object.keys(localStorage).includes(id)) {
                    return
                }
                this.setAttribute("cartboolean", 1);
                this.innerHTML = "Remove from Cart";
                incremenet_count(this.getAttribute("id"));
            }
        };
    }
}

customElements.define('product-item', ProductItem);