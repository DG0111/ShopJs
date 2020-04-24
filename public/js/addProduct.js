import {categories} from "../module/apiModule.js";
import {showCateSelect} from "../module/all.js";
import {getBase64} from "../module/all.js";
import {previewImage} from "../module/all.js";
import {validationFormProducts} from "../module/all.js";

import {addProduct} from "../module/apiModule.js";
import {products} from "../module/apiModule.js";

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
    if (check !== true) {
        const file = document.querySelector('input[type=file]').files[0];

        let data = getBase64(file);

        let dateNow = new Date();
        setTimeout(function(){
            let obj = {
                "categoryId": document.querySelector('#categorySelect').value,
                "name": document.querySelector('input[name=name]').value,
                "image": data.result,
                "price": document.querySelector('input[name=price]').value,
                "detail": document.querySelector('input[name=detail]').value,
                "creatAt": dateNow,
                "quantity": document.querySelector('input[name=quantity]').value
            };

            products().then(data => {
                let name = document.querySelector('input[name=name]').value;
                let trungTen = _.filter(data, value => value.name == name);
                console.log(trungTen);
                if(trungTen.length !== 0) {
                    alert('NOT NAME')
                } else {
                    addProduct(obj,document.querySelector('#categorySelect').value);
                }

            });
        }, 500)
    }
};



