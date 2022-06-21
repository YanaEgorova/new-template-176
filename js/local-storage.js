import { products } from './data/products.js';
export const localStorage = (id, count, ringSize = 6) => {
  
    const actualProduct = products.find(product => product.id === id);
  

    let cart = window.localStorage.getItem('cart');
    if(cart) {
        cart = JSON.parse(cart);
        const isFindProduct = cart.some(product => product.id === id);
        if(isFindProduct) {
            const updateCart = cart.map(product => {
               
                if(product.id === id) {
                    return {...product,ringSize: product.isItRing ? ringSize : null,quantity : count ? Number(count) : product.quantity + 1};
                } else {
                    return product;
                }
              
            });

            window.localStorage.setItem('cart', JSON.stringify(updateCart));
            return;
        }
        const updateCart = [...cart, {...actualProduct, quantity : count ? Number(count) : 1}];
        window.localStorage.setItem('cart', JSON.stringify(updateCart));
        return;
    };
    const newProduct = {...actualProduct,  quantity : count ? Number(count) : 1};
    if(actualProduct.isItRing) {
        newProduct.ringSize = ringSize;
    }
    const createCart = [newProduct];
    window.localStorage.setItem('cart', JSON.stringify(createCart));
}

export const getLocalStorageItem = () => {
    let localStorageData = window.localStorage.getItem('cart');
    if(localStorageData) {
        return JSON.parse(localStorageData);
    }
    return [];
}

export const getCartFulfillment = () => {
    let localStorageData = window.localStorage.getItem('cart');
    if(localStorageData) {
        let rawData = JSON.parse(localStorageData);
        let formattedData = [];

        rawData.forEach(item => {
            let newItem = {name: item["name"], price: item["price"], quantity: item['quantity']};

            formattedData.push(newItem);
        })

        return formattedData;
    }
    return [];
}