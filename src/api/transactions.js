import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const instance = axios.create({
    baseURL: "http://localhost:3000"
});
const mock = new AxiosMockAdapter(instance);

mock.onGet("/transactions").reply(200, [{
    TransactionId: 150,
    Status: "Pending",
    Type: "Withdrawal",
    ClientName: "Dale Cotton",
    Amount: 28.43
}]);

export default instance;