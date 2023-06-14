import service from "./config.services";

const stripePaymentService = (id, amount,name) => {
    return service.post("/stripe/payment", {id, amount,name})
};
export{
    stripePaymentService
}