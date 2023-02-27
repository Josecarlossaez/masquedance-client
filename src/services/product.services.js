
import service from "./config.services";

const createProductService = (newProduct) => {
    return service.post("/product/create",newProduct)
}

export {
    createProductService
}
