import {checkSession} from "../module/all.js";

checkSession();

let btnCheckout = document.querySelector('#btnCheckout');

btnCheckout.onclick = () => {
    let check = validation();
    if (check === true) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, checkout it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'check out!',
                    'Your cart has been check out.',
                    'success'
                )
            };
            sessionStorage.clear();
        }).then(() => {
            setTimeout(() => {
                location.replace('http://localhost:63342/shopingJs')
            },3000);
        })
    }
};
function validation() {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#checkOutForm").validate({
        rules: {
            name: {
                required: true,
            },
            address: {
                required: true,
            },
            email: {
                required: true,
                email: true
            }
        }
    });
    return $("#checkOutForm").valid();
};
