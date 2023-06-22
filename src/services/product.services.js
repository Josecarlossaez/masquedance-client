
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
    return service.patch(`/product/${productId}/update`, productUpdate)
};

const deleteProductService = (productId) => {
    return service.delete(`/product/${productId}/delete`)
};

const updateStockProductService = (newOrder) => {
    return service.post("/product/product-stock/update",newOrder )
} 




export {
    listProductService,
    detailsProductService,
    createProductService,
    updateProductService,
    deleteProductService,
    updateStockProductService
}
