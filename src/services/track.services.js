
import service from "./config.services";

const listTrackService = () => {
    return service.get("/track/list")
};

const detailsTrackService = (trackId) => {
    return service.get(`/track/${trackId}/details`)
}

const createTrackService = (newTrack) => {
    return service.post("/track/create", newTrack)
}

const updateTrackService = (trackId, trackUpdate) => {
    return service.patch(`/track/${trackId}/update`, trackUpdate)
}

const deletetrackService = (trackId) => {
    return service.delete(`/track/${trackId}/delete`)
}

export {
    listTrackService,
    detailsTrackService,
    createTrackService,
    updateTrackService,
    deletetrackService
}