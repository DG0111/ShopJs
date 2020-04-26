import {checkSession} from "../module/all.js";
import {SearchInput2} from "../module/all.js";

checkSession();
let btnSend = document.querySelector('#btnSend');
SearchInput2();

btnSend.onclick = () => {
    let check = validation();
    if (check === true) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send form it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'contact out!',
                    'THANK YOU',
                    'success'
                )
            };
            sessionStorage.clear();
        }).then(() => {
            setTimeout(() => {
                location.replace('../index.html')
            },3000);
        })
    }
};
function validation() {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#formContact").validate({
        rules: {
            name: {
                required: true,
            },
            subject: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
            },
        }
    });
    return $("#formContact").valid();
};
