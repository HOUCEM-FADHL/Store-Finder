const Store = require("../models/store.model");

module.exports = {
    
    createStore: (req, res) => {
        const { name , number , isOpen } = req.body;
        Store.create({ name, number, isOpen })
        .then((store) => res.json(store))
        .catch((err) => res.status(500).json(err));
    },
    getAllStores: (req, res) => {
        Store.find()
        .then((stores) => res.json(stores))
        .catch((err) => res.status(500).json(err));
    },
    getOneStore: (req, res) => {
        Store.findOne({ _id: req.params.id })
        .then((oneStore) => res.json(oneStore))
        .catch((err) => res.status(500).json(err));
    },
    getOneStoreByNumber: (req, res) => {
        Store.findOne({ number: req.params.number })
        .then((oneStore) => res.json(oneStore))
        .catch((err) => res.status(500).json(err));
    },
    
    updateStore: (req, res) => {
        Store.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name,
            number: req.body.number,
            isOpen: req.body.isOpen
        },
        { new: true, runValidators: true }
        )
        .then((store) => res.json(store))
        .catch((err) => res.status(500).json(err));
    },

    deleteStore: (req, res) => {
        Store.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Store deleted."))
        .catch((err) => res.status(500).json(err));
    }
    
}