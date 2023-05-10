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

export{
    listColectionService,
    detailsColectionService,
    createColectionService,
    updateColectionService,
    deleteColection
}