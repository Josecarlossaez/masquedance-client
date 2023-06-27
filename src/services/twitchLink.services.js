import service from "./config.services";

const createTwitchLinkService = (newTwitchLink) => {
  return service.post("/twitchLink/create", newTwitchLink);
};

const listTwitchLinkService = () => {
    return service.get("/twitchlink/list");
}
const updateTwitchLinkService = (twitchLinkId, twitchLinkUpdate) => {
    return service.patch(`twitchLink/${twitchLinkId}/update`, twitchLinkUpdate)
}

export { 
    createTwitchLinkService,
    listTwitchLinkService,
    updateTwitchLinkService
};
