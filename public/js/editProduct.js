import {loader} from "../module/all.js";
import {checkSessionEdit} from "../module/all.js";
import {oneProduct} from "../module/apiModule.js";
import {valueInputEdit} from "../module/all.js";
import {editProductApi} from "../module/apiModule.js";
import {getBase64} from "../module/all.js";
import {categories} from "../module/apiModule.js";
import {showCateSelect} from "../module/all.js";
import {validationFormEditProducts} from "../module/all.js";
import {previewImage} from "../module/all.js";

let btnEdit = document.querySelector("#btnEdit");

// loader(1000,500);

let product = checkSessionEdit();
oneProduct(product.idCate, product.idPro).then(data => {
    valueInputEdit(data);
    const name = document.querySelector('input[name=name]');
});

const inputFile = document.querySelector('#inputFile'); // lam thanh cha preview file
inputFile.onchange = () => {
    const previewImg = document.querySelector('#imageNew');
    const file = document.querySelector('input[type=file]').files[0];
    previewImage(file, previewImg);
};


btnEdit.onclick = () => {
    const check = validationFormEditProducts();
    if (check !== false) {
        let image = document.querySelector('input[name=image]').value;
        let obj = {
            "name": document.querySelector('input[name=name]').value,
            "image": null,
            "price": document.querySelector('input[name=price]').value,
            "detail": document.querySelector('input[name=detail]').value,
            "quantity": document.querySelector('input[name=quantity]').value
        };
        if (image === '') {
            oneProduct(product.idCate, product.idPro).then(data => {
                obj.image = data.image;
                editProductApi(product.idCate, product.idPro, obj);
            });
        } else {  // xu ly up anh
            let files = document.querySelector('#inputFile').files;
            let fileBase64 = getBase64(files[0]);
            oneProduct(product.idCate, product.idPro).then(data => {
                obj.image = fileBase64.result;
                editProductApi(product.idCate, product.idPro, obj);
            });
        }
    }
};





