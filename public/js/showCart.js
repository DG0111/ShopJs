import {showCart} from "../module/all.js";
import {checkSession} from "../module/all.js";
import {summary} from "../module/all.js";
import {SearchInput2} from "../module/all.js";

const mainCheckCard = document.querySelector("#mainCheckCard");
const noneCard = document.querySelector("#noneCard");
const subtotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");


checkSession();
SearchInput2();

const ShowCart = () => {

    let quantityProducts = 0;
    let idProducts = 0;
    let subTotal = 0;

    let myCart = JSON.parse(sessionStorage.getItem("myCart"));

    showCart(myCart);
    let quantity = document.querySelectorAll("#quantity");
    let price = document.querySelectorAll("#price");
    summary(myCart);

    console.log(quantity);

    for (let i = 0; i < quantity.length; i++) {
        console.log(i);
        quantity[i].onchange = () => {
            quantityProducts = quantity[i].value;
            idProducts = quantity[i].getAttribute("idProduct");
            for (let j = 0; j < myCart.length; j++) {
                if (myCart[j].id === idProducts) {
                    myCart[j].quantity = quantityProducts;
                    myCart[j].sumPrice = myCart[j].price * quantityProducts;
                    price[i].textContent = myCart[j].sumPrice + ' $';
                    sessionStorage.setItem('myCart', JSON.stringify(myCart));
                    summary(myCart);
                }
            }
        }
    }

// xóa

    let deletePro = document.querySelectorAll("#deletePro");
    let idProduct = 0;

    for (let i = 0; i < deletePro.length; i++) {
        deletePro[i].onclick = () => {
            console.log(1);
            idProduct = deletePro[i].getAttribute("idProduct");
            let arrDelete = _.remove(myCart, value => value.id !== idProduct);
            myCart = arrDelete;
            sessionStorage.setItem('myCart', JSON.stringify(myCart));
            summary(myCart);
            showCart(myCart);
            location.reload(); // thề luôn cần thằng này thực sự :)
        }
    }
};

let objSession = JSON.parse(sessionStorage.getItem("myCart"));
if (!objSession || objSession.length === 0) {
    mainCheckCard.style.display = "none";
} else {
    noneCard.style.display = "none";
    ShowCart();
}


let checkOut = document.querySelector('#checkOut');
checkOut.onclick = () => {
    location.replace('http://localhost:63342/shopingJs/page/checkOut.html')
};



