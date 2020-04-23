import {categories, products} from "../module/apiModule.js";
import {showProduct, loader, dataTable, removeProduct, editProduct} from "../module/all.js";
import {removeProductApi} from "../module/apiModule.js";


// edit thanh cong thi hien thị thông bóa
// loader(2000, 500);

window.location.href.replace(location.hash, '').replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) { // callback
        if (value === 'true' && key === 'edit') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete success ! OPP!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (value === 'true' && key === 'add') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Add success ! HEHE!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
);

const test = () => {
    products().then((data) => {
        showProduct(data, 'tbodyProduct')
            .then(() => {
                editProduct();
                dataTable('tableProducts');  // datatable
                // xóa sản phẩm
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
                                removeProductApi(idCate, idPro);
                                test(); // gọi lại
                            }
                        })
                    }
                }
            })
    });
};

test();











