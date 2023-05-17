import service from "./config.services";

const addProductToCartService = (productId) => {
    return service.patch(`/product/${productId}/add-to-cart`)
}

export{
    addProductToCartService
}