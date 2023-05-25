import service from "./config.services";

const createOrderService = (newOrder) => {
    return service.post("/order/create", newOrder)
}

export{
    createOrderService 
}