import {checkSession, SearchInput2} from "../module/all.js";
import {categories} from "../module/apiModule.js";
import {showCategories} from "../module/all.js";
import {newsId} from "../module/apiModule.js";
import {GetURLParameter} from "../module/all.js";

let cart = checkSession();
SearchInput2();

categories().then(data => {
    showCategories(data, 'showCategories');
});



newsId(GetURLParameter('id')).then(data => {
   document.querySelector('#title').textContent = data.name;
   document.querySelector('#imgNew').src = data.image;
   document.querySelector('#detail').textContent = data.content;
});

