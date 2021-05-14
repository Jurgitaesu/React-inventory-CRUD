module.exports = (req, res, next) => {
    const {
        name,
        quantity,
        price,
    } = req.body;

    function errorSend(message) {
        res.send({success: false, message});
    }

    if (name.length > 50 || name.length < 3) {
        return errorSend('Product name should be between 3 and 50 symbols');
    }

    if (typeof quantity === 'number' || quantity < 0) {
        return errorSend('Quantity should a number');
    }

    if (typeof price === 'number' || price < 0) {
        return errorSend('Price should a number');
    }
    next();
}