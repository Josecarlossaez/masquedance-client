import service from "./config.services";

const listDjService = () => {
    return service.get("/dj/list")
}

const detailsDjService = (djId) => {
    return service.get(`/dj/${djId}/details`)
}

const createDjService = (newDj) => {
    return service.post("/dj/create", newDj)
}

const updateDjService = (djId, djUpdate) => {
    return service.patch(`/dj/${djId}/update`, djUpdate)
}

const deleteDjService = (djId) => {
    return service.delete(`/dj/${djId}/delete`)
}

export{
    listDjService,
    detailsDjService,
    createDjService,
    updateDjService,
    deleteDjService
}