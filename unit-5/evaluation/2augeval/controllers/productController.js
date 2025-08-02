const Product = require('../models/Product');
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);



    } catch (error) {
        next(error);
    }
};
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
};
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'product not found' });

        }
        res.json(product);
    } catch (error) {
        next(error);
    }

};
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        return res.json({ message: 'product deleted successfully' })

    } catch (error) {
        next(error);
    }
};