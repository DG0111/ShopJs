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
import {news} from "../module/apiModule.js";
import {printNew} from "../module/all.js";

SearchInput2();

$('input[type="range"]').val(0).change(() => {
    let input = document.querySelector('input[type=range]').value;
    let filter = document.querySelector('#filter');
    let priceFilter = document.querySelector('#priceFilter');
    priceFilter.textContent = input + ' $';
    filter.href = `./products.html?price=${input}`;
});

let cart = checkSession();

categories().then(data => {
    showCategories(data, 'showCategories');
});

news().then(data => {
    printNew(data);
});






