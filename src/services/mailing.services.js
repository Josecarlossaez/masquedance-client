import service from "./config.services";

// Send mail to confirm to users about their counts has been created
const authMailConfirmService = () => {
    return service.post("/mailing/auth/confirm")
}

// Send mail to users about their order has been processed
const orderMailService = (newOrder) => {
    return service.post("/mailing/order/created", {newOrder})
}


export {
    authMailConfirmService,
    orderMailService
}