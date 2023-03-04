
import service from "./config.services";

const listProductService = () => {
    return service.get("/product/list")
}

const detailsProductService = (productId) => {
    return service.get(`/product/${productId}/details`)
}

const createProductService = (newProduct) => {
    return service.post("/product/create",newProduct)
};

const updateProductService = (productId, productUpdate) => {
    return service.patch(`/product/${productId}/update`)
};

const deleteProductService = (productId) => {
    return service.delete(`/product/${productId}/delete`)
};




export {
    listProductService,
    detailsProductService,
    createProductService,
    updateProductService,
    deleteProductService
}
