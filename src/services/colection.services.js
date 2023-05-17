import service from "./config.services"

const listColectionService = () => {
    return service.get("colection/list")
}

const detailsColectionService = (colectionId) => {
    return service.get(`colection/${colectionId}/details`)
}

const createColectionService = (newColection) => {
    return service.post("/colection/create", newColection)
}

const updateColectionService = (colectionId, colectionUpdate) => {
    return service.patch(`colection/${colectionId}/update`, colectionUpdate)
}

const deleteColection = (colectionId) => {
    return service.delete(`colection/${colectionId}/delete`)
}

const addProductToColectionService = (colectionId, productId2) => {
    return service.patch(`colection/${colectionId}/add-product`, productId2)
}

const removeProductToColectionService = (colectionId, productId2) => {
    return service.patch(`colection/${colectionId}/remove-product`, productId2)
}
export{
    listColectionService,
    detailsColectionService,
    createColectionService,
    updateColectionService,
    deleteColection,
    addProductToColectionService,
    removeProductToColectionService
}