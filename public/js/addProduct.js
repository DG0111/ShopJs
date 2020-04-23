import {categories} from "../module/apiModule.js";
import {showCateSelect} from "../module/all.js";
import {getBase64} from "../module/all.js";
import {previewImage} from "../module/all.js";
import {validationFormProducts} from "../module/all.js";

import {addProduct} from "../module/apiModule.js";

const inputFile = document.querySelector('#inputFile'); // lam thanh cha preview file
const btnAdd = document.querySelector('#btnAdd');

categories().then(data => {
    showCateSelect(data, 'categorySelect');
});
inputFile.onchange = () => {
    const previewImg = document.querySelector('#imageNew');
    const file = document.querySelector('input[type=file]').files[0];
    previewImage(file, previewImg);
};

// khi ban them san pham

btnAdd.onclick = () => {
    const check = validationFormProducts();
    if (check !== false) {
        const file = document.querySelector('input[type=file]').files[0];

        let data = getBase64(file);

        setTimeout(function(){
            let obj = {
                "categoryId": document.querySelector('#categorySelect').value,
                "name": document.querySelector('input[name=name]').value,
                "image": data.result,
                "price": document.querySelector('input[name=price]').value,
                "detail": document.querySelector('input[name=detail]').value,
                "quantity": document.querySelector('input[name=quantity]').value
            };
            addProduct(obj);
        }, 500)
    }
};



