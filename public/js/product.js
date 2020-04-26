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
import {compareValues} from "../module/all.js";
import {compareValueNumber} from "../module/all.js";

SearchInput2();

$('input[type="range"]').val(0).change(() => {
    let input = document.querySelector('input[type=range]').value;
    let filter = document.querySelector('#filter');
    let priceFilter = document.querySelector('#priceFilter');
    priceFilter.textContent = input + ' $';
    filter.href = `./products.html?price=${input}`;
});

let btnFilter2 = document.querySelector('#btnFilter2');
let filter2 = document.querySelector('#filter2');

btnFilter2.onclick = () => {
    if (filter2.value !== '') {
        location.replace(`products.html?az=${filter2.value}`);
    }
};

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
        printProductInProduct(_.filter(data, value => value.price <= parseInt(GetURLParameter('price'))));
        let btnAddToCart = document.querySelectorAll(".addToCart");
        addToCartInProduct(cart);
    });
} else if (GetURLParameter('search') !== undefined) { /// search lè
    products().then(data => {
        let arr = Search(data, GetURLParameter('search'));
        let array = [];
        _.forEach(arr, value => {
            array.push(value.item);
        });
        printProductInProduct(array);
        addToCartInProduct(cart);
    })
} else if (GetURLParameter('az') !== undefined) {
    if (GetURLParameter('az') === '1') {
        products().then(data => {
            let arr = data.sort(compareValues('name', 'esc'));
            printProductInProduct(arr);
            addToCartInProduct(cart);
        })
    } else if (GetURLParameter('az') === '3') {
        products().then(data => {
            let arr = data.sort(compareValueNumber('price', 'esc'));
            printProductInProduct(arr);
            addToCartInProduct(cart);
        })
    } else if (GetURLParameter('az') === '4') {
        products().then(data => {
            let arr = data.sort(compareValueNumber('price', 'desc'));
            printProductInProduct(arr);
            addToCartInProduct(cart);
        })
    } else {
        products().then(data => {
            let arr = data.sort(compareValues('name', 'desc'));
            printProductInProduct(arr);
            addToCartInProduct(cart);
        })
    }
} else {
    products().then(data => {
        printProductInProduct(data);
        addToCartInProduct(cart);
    });
}


