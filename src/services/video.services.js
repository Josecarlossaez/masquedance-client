import service from "./config.services";

const createVideoService = (newVideo) => {
    return service.post("/video/create", newVideo)
}

const listVideoService = () => {
    return service.get("/video/list")
}

export {
    createVideoService,
    listVideoService
}