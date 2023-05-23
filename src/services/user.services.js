import service from "./config.services";

const addProductToCartService = (productId) => {
    return service.patch(`/product/${productId}/add-to-cart`)
}

const removeProductFromCartService = (productId) => {
    return service.patch(`/product/${productId}/remove-from-cart`)
}

const listCartProductService = () => {
    return service.get("/user/cart")
}

export{
    addProductToCartService,
    removeProductFromCartService,
    listCartProductService
}