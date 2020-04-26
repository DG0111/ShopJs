// data Categories

export const categories = async () => {

    try {
        let urlApi = 'http://5e79bb5b17314d00161335e8.mockapi.io/category';
        const response = await axios.get(urlApi);
        return response.data;
    } catch (e) {
        console.log(e)
    }
};

// data products All
export const products = async () => {
    try {
        let urlApi = 'http://5e79bb5b17314d00161335e8.mockapi.io';
        let products = [];
        const dataProducts = await axios.get(`${urlApi}/category`)
            .then(response => response.data)
            .then(cate => Promise.all(
                _.map(cate, category => axios.get(`${urlApi}/category/${category.id}/products`))
                )
            );
        _.forEach(dataProducts, (value) => {
            _.forEach(value.data, (value1) => {
                products.push(value1);
            })
        });
        return products;
    } catch (e) {
        console.log(e)
    }
};

// remove product

export const removeProductApi = (idCategory, idProduct) => {
    let url = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCategory}/products/${idProduct}`;
    const response = axios.delete(url);
};


// lay 1 san pham duy nhat


export const oneProduct = async (idCate, idPro) => {
    let urlApi = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCate}/products/${idPro}`;
    const response = await axios.get(urlApi);
    return response.data;
};

// update product -- sửa product

export const editProductApi = (idCategory, idProduct, arr) => {
    let url = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCategory}/products/${idProduct}`;
    axios.put(url, arr, {
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }
    })
        .then(function (response) {
            localStorage.clear();
            location.replace("http://localhost:63342/shopingJs/page/admin/index.html?edit=true")
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};


// add them product

export const addProduct = (arr,idCate) => {
    let url = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCate}/products`;
    axios.post(url, arr)
        .then(function (response) {
            location.replace("http://localhost:63342/shopingJs/page/admin/index.html?add=true");
        })
        .catch(function (error) {
            console.log(error);
        });
};


// product in category

export const productInCategory = async (idCate) => {
    let urlApi = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCate}/products?p=1&limit=3`;
    const response = await axios.get(urlApi);
    return response.data;
};

export const productInCategory2 = async (idCate) => {
    let urlApi = `http://5e79bb5b17314d00161335e8.mockapi.io/category/${idCate}/products`;
    const response = await axios.get(urlApi);
    return response.data;
};

// news

export const news = async () => {
    try {
        let urlApi = 'http://5e79bb5b17314d00161335e8.mockapi.io/news';
        const response = await axios.get(urlApi);
        return response.data;
    } catch (e) {
        console.log(e)
    }
};

export const newsId = async (id) => {
    try {
        let urlApi = `http://5e79bb5b17314d00161335e8.mockapi.io/news/${id}`;
        const response = await axios.get(urlApi);
        return response.data;
    } catch (e) {
        console.log(e)
    }
};

