import {categories} from "../module/apiModule.js";
import {showCategories} from "../module/all.js";
import {GetURLParameter} from "../module/all.js";
import {productInCategory2} from "../module/apiModule.js";
import {printProductInProduct} from "../module/all.js";
import {checkSession} from "../module/all.js";
import {addToCart} from "../module/all.js";
import {products} from "../module/apiModule.js";
import {loader} from "../module/all.js";
import {Search} from "../module/all.js";
import {addToCartInProduct} from "../module/all.js";
import {SearchInput2} from "../module/all.js";

SearchInput2();

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
        addToCartInProduct(cart);
    });
} else if (GetURLParameter('price') !== undefined) {
    products().then(data => { /// lười quá rồi huhu
        printProductInProduct(_.filter(data, value => value.price <= GetURLParameter('price')));
        let btnAddToCart = document.querySelectorAll(".addToCart");
        addToCartInProduct(cart);
    });
} else if (GetURLParameter('search') !== undefined) { /// search lè
    products().then(data => {
        let arr = Search(data,GetURLParameter('search'));
        let array = [];
        _.forEach(arr, value => {
            array.push(value.item);
        });
        printProductInProduct(array);
        addToCartInProduct(cart);
    })
} else {
    products().then(data => {
        printProductInProduct(data);
        addToCartInProduct(cart);
    });
}


