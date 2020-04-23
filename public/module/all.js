import {removeProductApi, products} from "./apiModule.js";
import {categories} from "./apiModule.js";

export const dd = x => {
    console.log(x);
};

export const ddd = x => {
    console.log(x);
    debugger
};


// lấy tham số đường dẫn

export const GetURLParameter = (sParam) => {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};

// in ra table san pham

export const showProduct = async (arr, tagNameId) => {
    await categories().then(data => { // import từ apiModutle
        let tbodyProduct = document.querySelector(`#${tagNameId}`);
        let i = 0;
        tbodyProduct.innerHTML = '';
        _.forEach(arr, (value) => {
            let cate = _.filter(data, data => data.id === value.categoryId);
            tbodyProduct.innerHTML += `
                    <tr>
                      <td>${i++}</td>
                      <td>${value.name}</td>
                      <td><img src="${value.image}" width="100" alt=""></td>
                      <td>${cate[0].name}</td>
                      <td>${value.price}</td>
                      <td>
                        <button type="button" id="removeProduct" idPro="${value.id}" idCate="${value.categoryId}" class="btn btn-danger">Delete</button>
                        <a type="button" id="editProduct" href="editProduct.html?idPro=${value.id}&idCate=${value.categoryId}" idPro="${value.id}" idCate="${value.categoryId}" class="btn btn-success">Edit</a>
                      </td>
                    </tr>
                `
        });
    });

};

// loader

export const loader = (timeOut, fadeOut) => {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, timeOut); //wait for page load PLUS two seconds.
    });

    function removeLoader() {
        $("#loadingDiv").fadeOut(fadeOut, function () {
            // fadeOut complete. Remove the loading div
            $("#loadingDiv").remove(); //makes page more lightweight
        });
    }
};


// dataTable

export const dataTable = (idTable) => {
    $(document).ready(function () {
        $(`#${idTable}`).DataTable();
    });
};


// xoa product :( the la toi cha biet chuyen gi no xay ra o day ca

export const removeProduct = () => {
    let btnRemove = document.querySelectorAll("#removeProduct");
    for (let i = 0; i < btnRemove.length; i++) {
        btnRemove[i].onclick = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    let idPro = btnRemove[i].getAttribute("idPro");
                    let idCate = btnRemove[i].getAttribute("idCate");
                    let url = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCate}/products/${idPro}`;

                    axios.delete(url)
                        .then(function (response) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );

                            products().then((data) => {
                                showProduct(data, 'tbodyProduct').then(() => {
                                    dataTable('tableProducts'); // su dung datatable
                                    removeProduct();
                                });
                            });

                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                        .then(function () {
                            // always executed
                        });

                }
            })
        }
    }
};

// khi clock edit luu idpro va idCate vao sessionS
export const editProduct = () => {
    let btnEdit = document.querySelectorAll("#editProduct");
    for (let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].onclick = () => {
            let idPro = btnEdit[i].getAttribute("idPro");
            let idCate = btnEdit[i].getAttribute("idCate");
            let arr = {
                'idPro': idPro,
                'idCate': idCate
            };
            sessionStorage.setItem('editPro', JSON.stringify(arr));
        }
    }
};

//check session edit

export const checkSessionEdit = () => {
    let obj = JSON.parse(sessionStorage.getItem('editPro'));
    if (obj) {
        return obj;
    } else {
        location.replace("http://localhost:63342/shopingJs/page/admin/index.html?err=true");
    }
};


// do du lieu vao o input

export const valueInputEdit = (x) => {
    document.querySelector('#imageNew').setAttribute('src', x.image);
    document.querySelector('input[name=name]').value = x.name;
    document.querySelector('input[name=detail]').value = x.detail;
    document.querySelector('input[name=price]').value = x.price;
    document.querySelector('input[name=quantity]').value = x.quantity;
    document.querySelector('input[name=id]').value = x.id;
};


// chuyển đổi image về base64

export const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return reader;
};

// in ra select trong edit products
export const showCateSelect = (arr, idSelect) => {
    let categorySelect = document.querySelector(`#${idSelect}`);
    _.forEach(arr, (value) => {
        categorySelect.innerHTML += `
                    <option value="${value.id}">${value.name}</option>
               `;
    });
};


// validation form products

export const validationFormProducts = () => {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#addProForm").validate({
        rules: {
            name: {
                required: true,
            },
            image: {
                required: true,
                accept: 'image/*'
            },
            price: {
                required: true,
                number: true,
            },
            detail: {
                required: true,
            },
            quantity: {
                required: true,
                number: true
            }
        }
    });
    return $("#addProForm").valid();
};


export const validationFormEditProducts = () => {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#addProForm").validate({
        rules: {
            name: {
                required: true,
            },
            image: {
                accept: 'image/*'
            },
            price: {
                required: true,
                number: true,
            },
            detail: {
                required: true,
            },
            quantity: {
                required: true,
                number: true
            }
        }
    });
    return $("#addProForm").valid();
};


// preview image le.

export const previewImage = (fileImage, img) => {

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        img.src = reader.result;
    }, false);

    if (fileImage) {
        reader.readAsDataURL(fileImage);
    }
};

//


// index =========

// showCategories

export const showCategories = (arr, idBoxShow, page = '') => {
    let showCategory = document.querySelector(`#${idBoxShow}`);
    if(page === 'index') {
        _.map(arr, (value) => {
            showCategory.innerHTML += `
            <a href="./page/products.html?category=${value.id}" class="list-group-item">${value.name}</a>
        `;
        });
    } else {
        _.map(arr, (value) => {
            showCategory.innerHTML += `
            <a href="./products.html?category=${value.id}" class="list-group-item">${value.name}</a>
        `;
        });
    }

};


// sap xep theo ngay thang
export const compareValues = (key, order = 'asc') => {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // nếu không tồn tại
            return 0;
        }
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?     // hàm sắp xếp creatAt từ nhỏ đến lớn hoặc từ lớn đến nhỏ
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    }
};


// show san pham moi nhat


export const printProductNew = (arr) => {
    let showProductNew = document.querySelector("#showProductNew");
    _.forEach(arr, (value, index) => {
        showProductNew.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <a href="page/detailProduct.html?idCate=${value.categoryId}&idPro=${value.id}" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                  <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `;
    });
};

export const printProductSelling = (arr) => {  // show product selling :)
    let showProductSelling = document.querySelector("#showProductSelling");
    _.forEach(arr, (value, index) => { // lam den day bat dau ngao roi :(
        showProductSelling.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <a href="page/detailProduct.html?idCate=${value.categoryId}&idPro=${value.id}" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                  <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `;
    })
};


// add to card thanh cong

export const addToCardSuccess = (numberCart) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'Number cart : ' + numberCart
    });
};


// check session
export const checkSession = (cart = null) => {
    let carNumbers = document.querySelector("#carNumbers");
    let objSession = JSON.parse(sessionStorage.getItem("myCart"));
    let a = 0;
    if (objSession) {
        _.forEach(objSession, (value) => {
            a += value.quantity;
        });
        cart = objSession;
        carNumbers.textContent = a;
        return objSession;
    } else {
        carNumbers.textContent = a;
    }
};

// add to cart

export const addToCart = (id, name, price, image, cart) => {
    let carNumbers = document.querySelector("#carNumbers");
    let i;
    let obj = {
        id: id,
        name: name,
        price: price,
        image: image,
    };

    let flag = false;

    for (i = 0; i < cart.length; i++) {
        if (cart[i].id === obj.id) {
            flag = true;
            break;
        }
    }

    if (flag === false) { // san pham da co trong cart
        obj.quantity = 1;
        obj.sumPrice = obj.price * obj.quantity;
        cart.push(obj);
    } else {
        cart[i].quantity += 1;
        cart[i].sumPrice = cart[i].price * cart[i].quantity;
    }

    let cartNumbers = 0;

    for (i = 0; i < cart.length; i++) {
        cartNumbers += cart[i].quantity; // tinh so luong san pham trong cart
    }

    carNumbers.textContent = cartNumbers;

    sessionStorage.setItem('myCart', JSON.stringify(cart));

    addToCardSuccess(cartNumbers);
};


// detai product

export const showDetailProduct = (data) => {
    let name = document.querySelector('#name');
    let image = document.querySelector('#image');
    let price = document.querySelector('#price');
    let detail = document.querySelector('#detail');

    name.textContent = data.name;
    image.src = data.image;
    price.textContent = data.price + ' $';
    detail.textContent = data.detail;

};


export const showCart = (arr) => {
    let listProducts = document.querySelector('#listProducts');
    listProducts.innerHTML = "";
    _.forEach(arr, value => {
        listProducts.innerHTML += `
        <div class="mb-3 shadow">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mx-auto d-block image" src="${value.image}">
                </div>
                <div class="col-md-8">
                    <div class="info">
                        <div class="row">
                            <div class="col-md-5 product-name">
                                <div class="product-name">
                                    <a href="#">${value.name}</a>
                                </div>
                            </div>
                            <div class="col-md-4 quantity">
                                <label for="quantity">Quantity: </label>
                                <input id="quantity" idProduct="${value.id}" type="number" min="1" max="10" value="${value.quantity}" class="form-control quantity-input">
                                <button id="deletePro" idProduct="${value.id}" class="mt-1 btn btn-danger">DELETE</button>
                            </div>
                            <div class="col-md-3 price">
                                <span id="price" >${value.sumPrice} $</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    })
};

export const summary = (arr) => {
    let subTotal = 0;
    for (let i = 0; i < arr.length; i++) {
        subTotal += arr[i].sumPrice;
        subtotal.textContent = subTotal + " $";
        total.textContent = (subTotal + 1) + "$";
    }
};



export const printProductInProduct = (array) => {
    var showProducts = document.querySelector('#showProducts');
    // in ra table - su dung foreach
    _.forEach(array, (value) => {
        showProducts.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <a href="./detailProduct.html?idCate=${value.categoryId}&idPro=${value.id}" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                  <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `
    });
};
