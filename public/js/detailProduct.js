import {checkSession} from "../module/all.js";
import {GetURLParameter} from "../module/all.js";
import {categories} from "../module/apiModule.js";
import {showCategories} from "../module/all.js";
import {oneProduct} from "../module/apiModule.js";
import {showDetailProduct} from "../module/all.js";
import {addToCart} from "../module/all.js";
import {productInCategory} from "../module/apiModule.js";
import {SearchInput2} from "../module/all.js";


let cart = checkSession();
SearchInput2();

if(cart === undefined) {
    cart = [];
}


const idCate = GetURLParameter('idCate');
const idPro = GetURLParameter('idPro');
let btnAddToCard = document.querySelector('#btnAddToCard');
let relatedPro = document.querySelector('#relatedPro');

categories().then(data => {
    showCategories(data, 'showCategories');
});

oneProduct(idCate, idPro).then(data => {
    showDetailProduct(data);

    productInCategory(data.categoryId).then(data => {
        _.forEach(data, (value) => {
            relatedPro.innerHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                                <div class="card-body">
                                  <p class="card-text">${value.name}</p>
                                  <p class="card-text">${value.detail}</p>
                                  <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                      <a href="detailProduct.html?idCate=${value.categoryId}&idPro=${value.id}" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                      <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                    </div>
                                    <small class="text-muted">${value.price} VNĐ</small>
                                  </div>
                                </div>
                              </div>
                        </div>
                    `;
        });
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


    btnAddToCard.onclick = () => {
        addToCart(data.id, data.name, data.price, data.image, cart);
    };
});








