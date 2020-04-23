import {categories} from "../module/apiModule.js";
import {showCategories} from "../module/all.js";
import {GetURLParameter} from "../module/all.js";
import {productInCategory2} from "../module/apiModule.js";
import {printProductInProduct} from "../module/all.js";
import {checkSession} from "../module/all.js";
import {addToCart} from "../module/all.js";
import {products} from "../module/apiModule.js";
import {loader} from "../module/all.js";


$('input[type="range"]').val(0).change(() => {
    let input = document.querySelector('input[type=range]').value;
    let filter = document.querySelector('#filter');
    let priceFilter = document.querySelector('#priceFilter');
    priceFilter.textContent = input + ' $';
    filter.href = `./products.html?price=${input}`;
});

let cart = checkSession();

if (cart === undefined) {
    cart = [];
}

categories().then(data => {
    showCategories(data, 'showCategories');
});

if (GetURLParameter('category') !== undefined) {
    productInCategory2(GetURLParameter('category')).then(data => {
        printProductInProduct(data);

        let btnAddToCart = document.querySelectorAll(".addToCart");
        for (let k = 0; k < btnAddToCart.length; k++) {
            btnAddToCart[k].onclick = () => {
                let idProduct = btnAddToCart[k].getAttribute("idProduct");
                let nameProduct = btnAddToCart[k].getAttribute("nameProduct")
                let priceProduct = btnAddToCart[k].getAttribute("priceProduct")
                let imageProduct = btnAddToCart[k].getAttribute("imageProduct")
                addToCart(idProduct, nameProduct, priceProduct, imageProduct, cart);
            }
        }
    });
} else if (GetURLParameter('price') !== undefined) {
    products(GetURLParameter('category')).then(data => { /// lười quá rồi huhu
        printProductInProduct(_.filter(data, value => value.price <= GetURLParameter('price')));
        let btnAddToCart = document.querySelectorAll(".addToCart");
        for (let k = 0; k < btnAddToCart.length; k++) {
            btnAddToCart[k].onclick = () => {
                let idProduct = btnAddToCart[k].getAttribute("idProduct");
                let nameProduct = btnAddToCart[k].getAttribute("nameProduct")
                let priceProduct = btnAddToCart[k].getAttribute("priceProduct")
                let imageProduct = btnAddToCart[k].getAttribute("imageProduct")
                addToCart(idProduct, nameProduct, priceProduct, imageProduct, cart);
            }
        }
    });
} else {
    products(GetURLParameter('category')).then(data => {
        printProductInProduct(data);
        let btnAddToCart = document.querySelectorAll(".addToCart");
        for (let k = 0; k < btnAddToCart.length; k++) {
            btnAddToCart[k].onclick = () => {
                let idProduct = btnAddToCart[k].getAttribute("idProduct");
                let nameProduct = btnAddToCart[k].getAttribute("nameProduct")
                let priceProduct = btnAddToCart[k].getAttribute("priceProduct")
                let imageProduct = btnAddToCart[k].getAttribute("imageProduct")
                addToCart(idProduct, nameProduct, priceProduct, imageProduct, cart);
            }
        }
    });
}


