import {categories} from "../module/apiModule.js";
import {showCategories} from "../module/all.js";
import {products} from "../module/apiModule.js";
import {compareValues} from "../module/all.js";
import {printProductNew} from "../module/all.js";
import {printProductSelling} from "../module/all.js";
import {addToCardSuccess} from "../module/all.js";
import {checkSession} from "../module/all.js";
import {addToCart} from "../module/all.js";
import {SearchInput} from "../module/all.js";
import {news} from "../module/apiModule.js";
import {printNewHomePage} from "../module/all.js";
import {compareValueNumber} from "../module/all.js";


SearchInput();

let cart = checkSession();

if (cart == undefined) {
    cart = [];
}

categories().then(data => {
    showCategories(data, 'showCategory', 'index');
});

products().then(data => {
    for (let j = 0; j < data.length; j++) {
        data[j].creatAt = moment(data[j].creatAt).format('X'); // chuyển đổi định dàng ngày Unix Timestamp
    }
    let productSortDesc = data.sort(compareValues('creatAt', 'desc'));

    let top3NewProducts = _.slice(productSortDesc, 0, 3);
    printProductNew(top3NewProducts);

    let productSortDescPrice = data.sort(compareValueNumber('price', 'esc'));
    let top6PriceProducts = _.slice(productSortDescPrice, 0, 6);

    printProductSelling(top6PriceProducts); // in ra danh sach san pham gia thap nhat

    // add to cart
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


news().then(data => {
    let newSortDesc = data.sort(compareValues('createdAt', 'desc'));
    let arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(newSortDesc[i]);
    }
    printNewHomePage(arr);
});











