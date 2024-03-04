const StoreController = require("../controllers/store.controller");

module.exports = (app) => {

    app.post("/api/stores/add" ,StoreController.createStore);
    app.get("/api/stores", StoreController.getAllStores);
    app.get("/api/stores/:id", StoreController.getOneStore);
    app.patch("/api/stores/edit/:id", StoreController.updateStore);
    app.delete("/api/stores/:id", StoreController.deleteStore);
    app.get("/api/store/:number", StoreController.getOneStoreByNumber);
}