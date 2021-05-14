const inventoryDb = require('../schemas/inventorySchema')

module.exports = {
    addInventory: (req, res) => {
        const {
            name,
            quantity,
            price,
        } = req.body;
        const inventory = new inventoryDb();
        inventory.name = name;
        inventory.quantity = quantity;
        inventory.price = price;
        inventory.save().then(data => {
            res.send({success: true, message: "Inventory added"})
        })
    },
    showInventory: async (req, res) => {
        const inventory = await inventoryDb.find();
        res.send({success: true, message: null, inventory});
    },
    reduceQuantity: async (req, res) => {
        const id = req.params.id;
        const updateProduct = await inventoryDb.find({_id: id});
        if (updateProduct[0].quantity < 1) {
            return res.send({success: false, message: "Quantity is already 0"});
        }
        const quantity = updateProduct[0].quantity - 1;
        await inventoryDb.findByIdAndUpdate({_id: id}, {quantity: quantity});
        res.send({success: true, message: "Quantity reduced"});
    },
    addQuantity: async (req, res) => {
        const id = req.params.id;
        const updateProduct = await inventoryDb.find({_id: id});
        const quantity = updateProduct[0].quantity + 1;
        await inventoryDb.findByIdAndUpdate({_id: id}, {quantity: quantity});
        res.send({success: true, message: "Quantity added"});
    },
    deleteInventory: async (req, res) => {
        const id = req.params.id;
        const deleteId = await inventoryDb.findOneAndRemove({_id: id});
        await inventoryDb.findOneAndRemove({id: id});
        if (!!deleteId) {
            return res.send({success: true, message: "Product deleted"});
        } else {
            return res.send({success: false, message: "Nothing to delete"});
        }
    }
}